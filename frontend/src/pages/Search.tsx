import { useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SearchResultCard from "../components/SearchResultCard";
import { useSearchContext } from "../contexts/SearchContext";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>();

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page?.toString(),
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          {/* todo: filter */}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* todo: sort option */}
        </div>

        {hotelData?.data &&
          hotelData.data.map((hotel) => <SearchResultCard hotel={hotel} />)}
      </div>
    </div>
  );
};

export default Search;
