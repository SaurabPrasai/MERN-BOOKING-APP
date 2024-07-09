import { FormEvent } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const [destination, setDestination] = React.useState<string>(
    search.destination
  );
  const [checkIn, setCheckIn] = React.useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = React.useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = React.useState<number>(search.adultCount);
  const [childCount, setChildCount] = React.useState<number>(search.childCount);
  // const [hotelId, setHotelId] = React.useState<string>("");4
  const navigate=useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search')
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label htmlFor="" className=" flex items-center">
          Adults:
          <input
            type="number"
            min={1}
            max={20}
            className="w-full p-1 focus:outline-none font-bold"
            name=""
            id=""
            value={adultCount}
            onChange={(e) => setAdultCount(e.target.value)}
          />
        </label>
        <label htmlFor="" className=" flex items-center">
          Children:
          <input
            type="number"
            min={0}
            max={20}
            className="w-full p-1 focus:outline-none font-bold"
            name=""
            id=""
            value={childCount}
            onChange={(e) => setChildCount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-h-full w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-h-full bg-white p-2 w-full focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex flex-row gap-1">
        <button type="submit" className="w-2/3 h-full p-2 text-white text-xl bg-blue-600 font-bold hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 h-full p-2 text-xl text-white bg-red-600 font-bold hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
