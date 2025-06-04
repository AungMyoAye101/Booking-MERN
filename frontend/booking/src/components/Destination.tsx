import { useEffect, useRef, useState } from "react";
import { base_url } from "../lib/helper";
import { HotelType } from "../lib/types";
import { Link } from "react-router-dom";



const Destination = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<HotelType[][]>([])
  const [loading, setLoading] = useState(false)


  const fetchHotelBytype = async () => {
    try {
      setLoading(true)
      const res = await fetch(base_url + "/api/hotel/type/getHotelByCity?city=Tokyo,Denver,Miami", {
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



  const loadingElem = [1, 2, 3].map((i) => <div key={i} className="border shadow bg-white flex-1 p-2 rounded min-w-[200px] aspect-video">
    <div className="bg-neutral-200 rounded w-full h-full p-2">
      <div className="bg-neutral-50 h-5 w-40 rounded "></div>
    </div>
  </div>)



  return (
    <section className="mb-4">
      <h1 className="text-4xl font-roboto font-semibold mb-2 ">
        Trending destination
      </h1>
      <div className="relative">

        <main
          ref={containerRef}
          className="flex gap-4 flex-wrap relative"
        >
          {loading ? loadingElem : data.map((field) => (
            field.map((item) => (
              <Link
                to={`/search?destination=${item.city}`}
                key={item._id}
                className="min-w-[200px]  flex-1 h-auto  aspect-video rounded-lg overflow-hidden relative bg-white"
              >
                <img
                  src={item.photos[0]}
                  alt="image"
                  className="w-full h-auto hover:scale-125 transition-transform ease-in-out "
                />
                <h2 className="absolute top-4 left-4 text-white font-roboto text-2xl font-bold">
                  {item.city}
                </h2>
              </Link>
            ))

          ))}
        </main>
      </div>
    </section>
  );
};

export default Destination;
