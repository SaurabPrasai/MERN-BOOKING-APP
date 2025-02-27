import { useMutation } from "react-query";
import ManageHotelForm, { HotelFormData } from "../form/manageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client'


const AddHotel = () => {
  const {showToast}=useAppContext()
  const {mutate,isLoading}=useMutation({
    mutationFn:apiClient.addMyHotel,
      onSuccess:()=>{
        showToast({message:"Hotel Saved!",type:"SUCCESS"})
      },
      onError:()=>{
        showToast({message:"Error Saving Hotel!",type:"ERROR"})

      }
  })

  const handleSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>;
};

export default AddHotel;
