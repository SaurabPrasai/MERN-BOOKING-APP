import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function DetailsSection() {
  const { register,formState:{errors} } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-2 px-2 font-normal"
          id=""
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </label>
      <div className="flex gap-4">
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        City
        <input
          type="text"
          className="border rounded w-full py-2 px-2 font-normal"
          id=""
          {...register("city", { required: "This field is required" })}
        />
        {errors.city && <span className="text-red-500">{errors.city.message}</span>}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Country
        <input
          type="text"
          className="border rounded w-full py-2 px-2 font-normal"
          id=""
          {...register("country", { required: "This field is required" })}
        />
        {errors.country && <span className="text-red-500">{errors.country.message}</span>}
      </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          className="border rounded w-full py-2 px-2 font-normal"
          rows={10}
          id=""
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          className="border rounded w-full py-2 px-2 font-normal"
          id=""
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && <span className="text-red-500">{errors.pricePerNight.message}</span>}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
       <select  id="" {...register("starRating",{
          required:"This field is required",
       })} className="border rounded w-full p-2 font-normal text-gray-700 ">
        <option value="" className="text-sm font-bold">
          Select as Rating
        </option>
        {
          [1,2,3,4,5].map((num)=><option value={num} key={num}>{num}</option>)
        }
       </select>
        {errors.starRating && <span className="text-red-500">{errors.starRating.message}</span>}
      </label>
    </div>
  );
}
