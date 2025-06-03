
import { Link } from "react-router-dom";
import { HotelType } from "../lib/types";
import { FaLocationDot } from "react-icons/fa6";

const HotelCard = ({ item }: { item: HotelType }) => {
  return (

    <div
      key={item._id}
      className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg border h-fit"

    >
      <Link
        to={`/hotel/${item._id}`}
        className="w-40 aspect-square rounded-lg overflow-hidden "
      >
        <img src={item.photos[0]} alt="hotel image" className="w-full h-full object-cover" />
      </Link>
      <div className="flex justify-between gap-4 flex-1">
        <div className="flex flex-col gap-1 flex-1 font-roboto">
          <h1 className="text-2xl  font-semibold">{item.name}</h1>
          <h2 className=" text-sm opacity-85 ">{item.title} </h2>
          <div className="flex items-center gap-1 ">
            <FaLocationDot /> <span>{item.city}</span>
          </div>
          <p className="  line-clamp-3">{item.description}</p>
          <div className="text-lg ">
            <b>{item.price} </b>/night
          </div>

        </div>
        <div className="flex flex-col gap-4 justify-between">
          <div className="w-fit self-end py-2 px-3 bg-blue-600 text-white rounded-md inline-block">
            {item.rating}
          </div>
          <button className="btn self-end">Reserve</button>
        </div>

      </div>
    </div>

  );
};

export default HotelCard;
