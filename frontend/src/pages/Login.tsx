import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient=useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation(apiClient.login, {
    onSuccess: async() => {
      showToast({ message: "Login Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken")
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });

  const formSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      className=" max-w-lg flex  flex-col  mx-auto text-2xl text-gray-700 font-semibold"
      onSubmit={formSubmit}
    >
      <h1 className=" text-3xl font-bold">Login</h1>
      <label htmlFor="">Email:</label>
      <input
        type="email"
        id=""
        className={`border p-2 mb-5 text-xl rounded font-normal ${
          errors.email ? "border-red-500 outline-none" : "border-gray-700"
        }`}
        {...register("email", { required: "email is required" })}
    
      />
      <label htmlFor="">Password:</label>
      <input
        type="password"
        id=""
        className={`border text-xl p-2 rounded font-normal mb-5 ${
          errors.password ? "border-red-500 outline-none" : "border-gray-700"
        }`}
        {...register("password", { required: "Password is required" })}
      
      />
      <button className="border border-gray-600 bg-blue-800 text-white p-2 rounded font-normal text-xl   mb-5 hover:bg-blue-500">
        Login
      </button>
      <p className=" text-xl font-normal">Don't have an account <Link to={'/register'} className=" text-blue-600">Click here</Link></p>
    </form>
  );
};

export default Login;
