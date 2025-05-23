import { Link, useSearchParams } from "react-router-dom";

import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { base_url } from "../lib/helper";



const Search = () => {
  const [hotel, setHotel] = useState()

  const [searchParam] = useSearchParams()
  const destination = searchParam.get('destination')
  const checkIn = searchParam.get('checkIn')
  const checkOut = searchParam.get('checkOut')
  const guest = searchParam.get('guest')

  console.log(destination, checkIn, checkOut, guest)
  useEffect(() => {
    searchHotel()

  }, [destination, checkIn, checkOut, guest])

  const searchHotel = async () => {
    try {
      const res = await fetch(base_url + `/api/search?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guest=${guest}`, {
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
    }
  }
  console.log(hotel)
  return (
    <section className=" py-20 flex gap-4   max-w-6xl mx-auto">
      {/* <SideBar />
      <div className="flex flex-col gap-4">
        {
          loading ? <h1>Loading...</h1> : searchData?.map((item) => (
            <div
              key={item._id}
              className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg "

            >
              <Link
                to={`/hotel/${item._id}`}
                className="w-40 aspect-square rounded-lg overflow-hidden "
              >
                <img src={item.photos[0]} alt="hotel image" className="w-full h-full object-cover" />
              </Link>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between items-center">

                  <h1 className="text-2xl font-roboto font-semibold">{item.name}</h1>
                  <div className="py-1 px-2 bg-blue-600 text-white rounded-md inline-block">
                    {item.rating}
                  </div>
                </div>
                <h2 className="font-roboto text-sm opacity-85 ">{item.title} </h2>
                <p className=" font-serif ">{item.description}</p>
                <button className="btn self-end">Reserve</button>
              </div>
            </div>
          ))

        }
      </div> */}


    </section>
  );
};

export default Search;
