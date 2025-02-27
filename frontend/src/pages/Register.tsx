import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
const navigate=useNavigate()
const queryClient=useQueryClient()

const {showToast}=useAppContext()

  const { register,watch,handleSubmit,formState:{errors}} = useForm<RegisterFormData>();

  const mutation=useMutation(apiClient.register,{
    onSuccess:async()=>{
      showToast({message:"Registration Success!",type:"SUCCESS"})
      await queryClient.invalidateQueries("validateToken")
      navigate('/')
    },
    onError:(error:Error)=>{
      showToast({message:error.message,type:"ERROR"})
    }
  })

  const onSubmit=handleSubmit((data)=>{
    mutation.mutate(data);
  })
  return (
    <form className="flex flex-col gap-5 " onSubmit={onSubmit}>
      <h1 className=" text-3xl font-bold">Create an Account</h1>
      <div className="flex flex-col gap-5 md:flex-row">

        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className={`border  rounded w-full py-2 px-2 font-normal ${errors.firstName?"border-red-500 outline-none":""}`}
            id=""
            {...register("firstName",{required:"This field is required"})}
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </label>

        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-2 px-2 font-normal"
            id=""
            {...register("lastName",{required:"This field is required"})}
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
        </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-2 px-2 font-normal"
            id=""
            {...register("email",{required:"This field is required"})}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-2 px-2 font-normal"
            id=""
            {...register("password",{required:"This field is required",minLength:{
                value:6,
                message:"Password must be at least 6 characters"
            }})}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Confirm Password
          <input
            type="password"
            className="border rounded w-full py-2 px-2 font-normal"
            id=""
            {...register("confirmPassword",{validate:(value)=>{
                if(!value){
                    return "This field is required"
                }
               else if(watch("password")!==value){
                return "Your passwords do not match"
               }
            }})}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
        </label>
        <span>
            <button className=" bg-blue-800 text-white p-2 font-bold hover:bg-blue-500 text-xl">Create Account</button>
        </span>
        <p className=" text-xl">Already have an account <Link to={'/sign-in'} className=" text-blue-600">Click here</Link></p>
    </form>
  );
};

export default Register;
