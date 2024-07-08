import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import React from "react";

const ImageSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete=async(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageUrl:string)=>{
      event.preventDefault();
      setValue("imageUrls",existingImageUrls.filter((url)=>url!==imageUrl))
  }

  return (
    <div>
      <h2 className=" font-bold text-2xl  mb-3 ">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <div className=" grid grid-cols-6 gap-4">
          {existingImageUrls &&
            existingImageUrls.map((url, index) => (
              <div className="relative group" key={index}>
                <img
                  src={url}
                  alt="hotel"
                  className="min-h-full object-cover"
                />
                <button className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white" onClick={(e)=>handleDelete(e,url)}>
                  Delete
                </button>
              </div>
            ))}
        </div>

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length+(existingImageUrls?.length||0);
              if (totalLength === 0) {
                return "At least one image should be added";
              }
              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-bold text-sm">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection;
