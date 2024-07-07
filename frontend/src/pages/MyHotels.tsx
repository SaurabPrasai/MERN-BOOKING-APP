import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { BsCurrencyDollar, BsMap, BsType } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery({
    queryKey: "fetchMyHotels",
    queryFn: apiClient.fetchMyHotels,
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
  });
  if (!hotelData) return <div>No Hotels Found</div>;
  return (
    <div className=" space-y-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          className="bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          to={"/add-hotel"}
        >
          Add Hotel
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 ">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg gap-5 p-3"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className=" whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsCurrencyDollar className="mr-1" />
                {hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <div className=" flex justify-end">
            <Link
          className="bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          to={`/edit-hotel/${hotel._id}`}
        >
          Add Hotel
        </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
