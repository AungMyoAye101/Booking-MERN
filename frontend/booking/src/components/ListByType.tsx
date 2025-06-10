import { useEffect, useRef, useState } from "react";
import { PiGreaterThan, PiLessThan } from "react-icons/pi";
import { base_url } from "../lib/helper";
import HotelLoading from "./HotelLoading";
import { Link } from "react-router-dom";
import { hotelTypes } from "../config/createHotel";

type HotelList = {
  type: string,
  count: number,
  photo: string
}
const hotelListTypes = hotelTypes.join(',')

const ListByType = () => {
  const [data, setData] = useState<HotelList[]>([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSlide = (isRight: boolean) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: isRight ? 300 : -300,
        behavior: "smooth",
      });
    }
  };


  const fetchHotelBytype = async () => {
    try {
      setLoading(true)
      const res = await fetch(base_url + `/api/hotel/type/hotelType?type=${hotelListTypes}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const { success, message, data } = await res.json()
      if (!res.ok && success === false) {
        throw new Error(message)
      }
      setData(data)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchHotelBytype()
  }, [])
  console.log(data)

  return (
    <section className="my-4 py-10">
      <h1 className="text-4xl font-roboto font-semibold mb-2 ">
        Browse by property type
      </h1>
      <div className="relative">
        <button
          onClick={() => handleSlide(false)}
          className="bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute left-0 top-[50%] translate-y-[-50%]"
        >
          <PiLessThan />
        </button>
        <button
          onClick={() => handleSlide(true)}
          className="bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute right-0 top-[50%] translate-y-[-50%]"
        >
          <PiGreaterThan />
        </button>
        <main
          ref={containerRef}
          className="flex gap-4 overflow-hidden flex-nowrap  relative py-4"
        >
          {loading ? <HotelLoading /> : data.map((item) => (
            <Link
              to={`/type/${item.type}?limit=6&page=1`}
              key={item.type}
              className="min-w-[250px]  relative rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white"
            >
              <div className=" overflow-hidden">
                <img
                  src={item.photo}
                  alt="image"
                  className="w-full h-auto hover:scale-125 transition-transform ease-in-out aspect-square"
                />
              </div>
              <div className="py-4 px-2 flex gap-2 items-center justify-between">
                <h2 className="  font-roboto text-lg font-semibold">
                  {item.type}
                </h2>
                <p className="text-sm "> <b>{item.count}</b> properties</p>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </section>
  );
};

export default ListByType;
