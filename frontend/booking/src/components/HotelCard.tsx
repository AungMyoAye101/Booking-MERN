import React from "react";
import { HotelType } from "../lib/types";

const HotelCard = ({
  name,
  title,
  city,
  description,
  photos,
  rating,
  cheapestPrice,
  type,
}: HotelType) => {
  return (
    <div className="flex gap-4  bg-white shadow-lg rounded-lg p-4 relative">
      <div className="w-64 aspect-square rounded-lg relative overflow-hidden">
        <div className="absolute top-2 right-2 z-10 w-10 h-10 bg-pink-400 rounded-full cursor-pointer"></div>
        <img
          src="https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740"
          alt="hotel photo"
          className="object-cover w-full h-full hover:scale-125 transition-transform ease-in-out duration-300  "
        />
      </div>
      <div className="w-full flex flex-col justify-between gap-4 ">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-4">
            <h1 className="text-xl font-semibold font-roboto ">{name} </h1>
            <div className="flex  items-center gap-2">
              <div className="flex flex-col font-roboto">
                <h3 className="font-semibold text-sm">Good</h3>{" "}
                <span className="text-xs ">23 reviews</span>
              </div>
              <div className="py-2 px-2.5 bg-blue-800 rounded-lg text-white">
                {rating}
              </div>
            </div>
          </div>
          <p className="font-semibold text-sm font-serif opacity-60">{city}</p>
          <p className="text-sm font-roboto">{description}</p>
        </div>

        <div className="flex justify-between">
          <div className="text-lg">
            <span>1 night for </span>
            <span className="font-semibold">{cheapestPrice} MMK</span>
          </div>
          <button className="btn">See availability </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
