import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHotelForm, { HotelFormData } from "../form/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
        const {hotelId}=useParams();
        const {showToast}=useAppContext()

        const {data:hotel}=useQuery({
            queryKey:"fetchMyHotelById",
            queryFn:()=>apiClient.fetchMyHotelById(hotelId)
        })

        const {mutate,isLoading}=useMutation({
            mutationFn:apiClient.updateMyHotelById,
            onSuccess:(data)=>{
                showToast({message:"Hotel Updated!",type:"SUCCESS"})
            },
            onError:(err:Error)=>
                showToast({message:err.message,type:"ERROR"})
        })
        const handleSave=((hotelFormData:HotelFormData)=>{
            mutate(hotelFormData)
        })
  return <ManageHotelForm onSave={handleSave} hotel={hotel} isLoading={isLoading}/>
}

export default EditHotel
