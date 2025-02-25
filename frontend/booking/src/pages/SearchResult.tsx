import React from "react";
import HotelCard from "../components/HotelCard";

const SearchResult = () => {
  return (
    <div className="flex flex-col   gap-4  bg-green-400">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <HotelCard key={i} />
        ))}
    </div>
  );
};

export default SearchResult;
