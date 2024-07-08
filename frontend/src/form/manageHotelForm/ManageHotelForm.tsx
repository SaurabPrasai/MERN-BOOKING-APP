import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../../../backend/src/models/hotel";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: string;
  facilities: string[];
  starRating: number;
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
  imageUrls: string[];
  hotelId:string;
};

type Props = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?:HotelType
};

const ManageHotelForm = ({ onSave, isLoading,hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit ,reset} = formMethods;

  useEffect(()=>{
    reset(hotel)
  },[hotel,reset])
  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    if(hotel){
      formData.append("hotelId",hotel._id)
    }
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    
    if(data.imageUrls){
      data.imageUrls.forEach((imageUrl,index)=>{
        formData.append(`imageUrls[${index}]`,imageUrl)
      })
    }

    Array.from(data.imageFiles).forEach((image) => {
      formData.append(`imageFiles`, image);
    });
    onSave(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
          <button
            className="bg-blue-600 text-white p-2 font-bold hover:opacity-95 disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
