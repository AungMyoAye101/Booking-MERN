import { BiHeart, BiShareAlt } from "react-icons/bi";
import { FaParking } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import Review from "../components/Review";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelType } from "../lib/types";

const HotelDetail = () => {
  const [hotel, setHotel] = useState<HotelType>({
    _id: "",
    name: "",
    title: "",
    description: "",
    photos: [],
    address: "",
    price: 0,
    city: "",
    distance: "",
    featured: false,
    rating: 0,
    rooms: [],
    type: "",
  });
  const { id } = useParams();
  const fetchHotel = async () => {
    const res = await fetch(`http://localhost:5000/api/hotel/${id}`);
    const data = await res.json();
    setHotel(data);
  };
  useEffect(() => {
    fetchHotel();
  }, []);
  console.log(hotel);
  return (
    <section className=" py-16 max-w-6xl m-auto p-4">
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="text-2xl font-roboto font-bold">{hotel.name}</h1>
          <div className="flex gap-2 items-center">
            <FaLocationDot />{" "}
            <p className="font-roboto font-semibold">{hotel.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BiHeart className="text-2xl cursor-pointer" />{" "}
          <BiShareAlt className="text-2xl cursor-pointer" />
          <button className=" bg-blue-700 hover:bg-blue-300 text-white font-roboto text-sm px-4 py-2 rounded-md">
            I'll reserve
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className=" py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {hotel.photos.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={hotel.name + " room photo"}
              className={`${i === 0 ? "col-span-2 row-span-2 " : ""
                }rounded-xl object-cover w-full h-full`}
            />
          ))}
        </div>
        <Review />
      </div>

      <div className="flex  gap-4 justify-between">
        <p className="text-sm font-serif">{hotel.description}</p>
        <div className=" bg-blue-100 rounded-lg shadow-lg w-72 min-w-72 p-4 flex flex-col gap-3">
          <h1 className="font-roboto font-semibold text-lg">
            Property highlight
          </h1>
          <h2 className="font-semibold font-roboto ">
            Perfect for 1 night stay
          </h2>
          <div className="flex gap-2 items-center ">
            <FaLocationDot />
            <p className="text-sm ">{hotel.distance}</p>
          </div>
          <h2 className="font-semibold font-roboto ">Breakfast info</h2>
          <p className="text-sm font-roboto ">
            Continental, Vegetarian, Asian, American
          </p>
          <div className="flex gap-2 items-center ">
            <FaParking />
            <p className="text-sm ">Free parking available at the hotel</p>
          </div>
          <button className="w-full bg-blue-700 hover:bg-blue-300 text-white font-roboto text-sm px-4 py-2 rounded-md">
            Reserve
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotelDetail;
