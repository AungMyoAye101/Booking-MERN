
import { Link } from "react-router-dom";
import { HotelType } from "../lib/types";
import { FaLocationDot, FaStar } from "react-icons/fa6";

const HotelCard = ({ item }: { item: HotelType }) => {


  const stars = [1, 2, 3, 4, 5]

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
          <div className="flex  gap-1">

            {
              stars.map(count => <FaStar key={count} className={`${count <= Number(item.rating) ? "text-amber-500" : "text-gray-600"}`} />)
            }
          </div>
          <h2 className=" text-sm opacity-85 ">{item.title} </h2>
          <div className="flex items-center gap-1 ">
            <FaLocationDot /> <span>{item.city}</span>
          </div>
          <p className="  line-clamp-3 opacity-90">{item.description}</p>
          <div className="text-lg text-blue-600">
            <b>$ {item.price} </b>/night
          </div>

        </div>
        <div className="flex flex-col gap-4 justify-between">
          <div className="w-fit self-end py-2 px-3 bg-blue-600 text-white rounded-md inline-block">
            {item.rating}
          </div>
          <Link to={`/hotel/${item._id}`} className="btn self-end">See availability</Link>
        </div>

      </div>
    </div>

  );
};

export default HotelCard;
