import { BiHeart, BiShareAlt } from "react-icons/bi";
import { FaParking } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Review from "../components/Review";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelType } from "../lib/types";
import RoomList from "../components/RoomList";
import ReviewForm from "../components/ReviewForm";

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
    rating: 0,
    rooms: [],
    type: "",
    amenities: [],
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
          <a href="#room" className=" bg-blue-700 hover:bg-blue-300 text-white font-roboto text-sm px-4 py-2 rounded-md">
            I'll reserve
          </a>
        </div>
      </div>


      <div className="w-full flex justify-between gap-4">
        <div className="flex flex-col gap-4">


          <div className=" py-4 grid grid-cols-2 gap-1">
            {hotel.photos.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={hotel.name + " room photo"}
                className={`
                  rounded-xl object-cover w-full h-full aspect-video`}
              />
            ))}
          </div>
          <p className=" font-serif">{hotel.description}</p>
          <div className="flex gap-2 items-center">

            {
              hotel.amenities.map((item) => (<div key={item} className="font-serif text-sm bg-blue-200 py-1 px-2 rounded-lg">{item}</div>))
            }
          </div>
        </div>





        <div className=" bg-white rounded-lg shadow-xl w-72 min-w-72 p-4 flex flex-col gap-3">
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
      <div className="flex flex-col gap-4 py-4">

        <Review hotelId={id!} />
        <ReviewForm hotelId={id!} />
        <RoomList hotelId={id!} />
      </div>

    </section>
  );
};

export default HotelDetail;
