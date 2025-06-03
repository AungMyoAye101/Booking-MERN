
import { HotelType } from "../lib/types";

const HotelCard = (hotel: HotelType) => {
  return (
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
        <div className="flex flex-wrap gap-2 items-center">

          {
            hotel.amenities.map((item) => (<div key={item} className="font-serif text-sm bg-blue-200 py-1 px-2 rounded-lg">{item}</div>))
          }
        </div>
      </div>


    </div>
  );
};

export default HotelCard;
