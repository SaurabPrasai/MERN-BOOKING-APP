import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotels",searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
    retry: false
  });

console.log(hotelData)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-1p  ">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          {/* TODO filters */}
        </div>
      </div>
      <div className="flex-flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* TODO Sort options */}
        </div>
      
          {hotelData?.data.map((hotel) => (
            <SearchResultCard hotel={hotel} key={hotel._id} />
          ))}
        
      <div>
      <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={setPage}
        />
      </div>
      </div>
    </div>
  );
};

export default Search;
