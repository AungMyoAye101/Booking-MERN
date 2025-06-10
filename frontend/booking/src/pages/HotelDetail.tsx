import { BiHeart, BiShareAlt } from "react-icons/bi";
// import { FaParking } from "react-icons/fa";
import { FaLocationDot, FaStar } from "react-icons/fa6";
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
    const { data } = await res.json();
    setHotel(data);
  };
  useEffect(() => {
    fetchHotel();
  }, []);



  return (
    <section className=" py-16 max-w-6xl m-auto p-4">

      {/* hotel headers information  */}
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="text-2xl font-roboto font-bold">{hotel.name}</h1>
          <div className="flex gap-2 items-center">
            <FaLocationDot />{" "}
            <p className="font-roboto font-semibold">{hotel.address}</p>
          </div>
          <div className="flex gap-1">
            {
              [1, 2, 3, 4, 5].map(star => <FaStar key={star} className={` ${star <= Number(hotel.rating) ? "text-amber-400" : "text-gray-400"}`} />)
            }
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



      <div className="flex flex-col gap-4">


        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-1">
          {hotel.photos.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={hotel.name + " room photo"}
              className={`
                  w-full h-full rounded-lg object-cover aspect-video `}
            />
          ))}
        </div>


        <div className="space-y-2">
          <div className="flex flex-col md:flex-row  justify-between">
            <h1 className=" font-roboto text-2xl  ">{hotel.title}</h1>
            <p className="font-roboto text-xl font-semibold text-amber-500">
              $ {hotel.price} / night
            </p>
          </div>
          <p className=" font-roboto text-lg ">{hotel.description}</p>
          <div className="flex flex-wrap gap-2 items-center">

            {
              hotel.amenities.map((item) => (<div key={item} className="font-serif text-sm bg-blue-600 text-white py-1 px-2 rounded">{item}</div>))
            }
          </div>
        </div>


      </div>





      <div className="flex flex-col gap-4 py-4">

        <Review hotelId={id!} />
        <ReviewForm hotelId={id!} />
        <RoomList hotelId={id!} hotelName={hotel.name} />
      </div>

    </section>
  );
};

export default HotelDetail;
