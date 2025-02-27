import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Guests</h2>
      <div className="flex flex-row gap-4 bg-gray-300 p-4">
        <label
          htmlFor=""
          className="flex flex-col text-sm text-gray-700 font-semibold flex-1"
        >
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-2 font-normal"
            {...register("adultCount", { required: "This field is required" })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}{" "}
            </span>
          )}
        </label>
        <label
          htmlFor=""
          className="flex flex-col text-sm text-gray-700 font-semibold flex-1"
        >
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full py-2 px-2 font-normal"
            {...register("childCount", { required: "This field is required" })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}{" "}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
