import { Link, useSearchParams } from "react-router-dom";

import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { base_url } from "../lib/helper";
import { HotelType } from "../lib/types";



const Search = () => {
  const [hotel, setHotel] = useState<HotelType[]>([])
  const [searchParam] = useSearchParams()
  const destination = searchParam.get('destination')
  const checkIn = searchParam.get('checkIn')
  const checkOut = searchParam.get('checkOut')
  const guests = searchParam.get('guests')
  const rating = searchParam.get('rating')
  const sort = searchParam.get('sort')
  const minPrice = searchParam.get('minPrice')
  const maxPrice = searchParam.get('maxPrice')

  const [loading, setLoading] = useState(false)


  useEffect(() => {
    searchHotel()

  }, [searchParam.toString()])

  const searchHotel = async () => {
    try {
      setLoading(true)
      const res = await fetch(base_url + `/api/search?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&sort=${sort}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const { success, message, data } = await res.json()
      if (!res.ok && success === false) {
        throw new Error(message)
      }
      setHotel(data)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }
  const loadingElem = [1, 2, 3, 4, 5, 6,].map(i => (<div key={i} className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg border">
    <div className="w-40 aspect-square rounded-lg bg-neutral-200"></div>
    <div className="flex justify-between flex-1 ">

      <div className="flex flex-col gap-2">
        <div className="w-40 h-4 rounded bg-neutral-200"></div>
        <div className="w-40 h-4 rounded bg-neutral-200"></div>
        <div className="w-80 h-4 rounded bg-neutral-200"></div>
        <div className="w-80 h-4 rounded bg-neutral-200"></div>
      </div>
      <div className="flex flex-col justify-between">

        <div className="w-10 h-10 bg-neutral-200 rounded-lg self-end"></div>
        <div className="w-40 h-10 bg-neutral-200 rounded-lg self-end"></div>
      </div>
    </div>
  </div>))
  return (
    <section className=" py-20 flex gap-4   max-w-6xl mx-auto">
      <SideBar />
      <div className="w-full flex flex-col gap-4">
        {
          loading ? loadingElem : hotel?.map((item) => (
            <div
              key={item._id}
              className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg border"

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
          ))

        }
      </div>


    </section>
  );
};

export default Search;
