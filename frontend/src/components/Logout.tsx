import { useQuery, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";


const Logout = () => {
    const {showToast}=useAppContext()
    const queryClient=useQueryClient()
    const {refetch}=useQuery("logout", apiClient.logout,{
      onSuccess:async(data)=>{
         await queryClient.invalidateQueries("validateToken")
            showToast({message:data.msg,type:"SUCCESS"})
      },
      onError:(err:Error)=>{
        showToast({message:err.message,type:"ERROR"})
      },
      enabled:false
    });
    const userLogout = () => {
      refetch()
    };
  return (
    <button onClick={userLogout} className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 hover:cursor-pointer">
      Logout
    </button>
  )
}

export default Logout
