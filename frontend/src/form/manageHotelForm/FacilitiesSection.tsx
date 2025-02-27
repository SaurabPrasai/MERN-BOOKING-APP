import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { hotelFacilities } from "../../config/hotel-options-config"


const FacilitiesSection = () => {
  const {register,formState:{errors}}=useFormContext<HotelFormData>()

  return (
    <div>
      <h2 className=" text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
      {
        hotelFacilities.map((facility)=>(
            <label htmlFor={facility} className="flex gap-1 text-gray-700 items-center" key={facility}>
              <input type="checkbox" {...register("facilities",{
                 validate:(facilities)=>{
                    if(facilities && facilities.length>0){
                      return true;
                    }else{
                      return "At least one facility is required"
                    }
                 }
              })} value={facility} id={facility} />
              {facility}
            </label>
        ))
      }
      </div>
      {errors.facilities && <span className=" text-red-500 text-sm font-bold">{errors.facilities.message}</span>}
    </div>
  )
}

export default FacilitiesSection
