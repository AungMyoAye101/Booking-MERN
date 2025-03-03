import React from "react";
import HotelCard from "../components/HotelCard";

const SearchResult = ({ data, loading }: any) => {
  return (
    <div className="flex flex-col   gap-4  ">
      {loading ? (
        <div>Loading ....</div>
      ) : (
        data.map((item) => (
          <HotelCard
            key={item._id}
            name={item.name}
            city={item.city}
            description={item.description}
            cheapestPrice={item.cheapestPrice}
            rating={item.rating}
          />
        ))
      )}
    </div>
  );
};

export default SearchResult;
