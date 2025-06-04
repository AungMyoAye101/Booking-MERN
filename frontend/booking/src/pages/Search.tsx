import { useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { base_url, loadingElem } from "../lib/helper";
import { HotelType } from "../lib/types";
import NotFound from "./NotFound";
import Pagination, { PaginationType } from "../components/Pagination";
import HotelCard from "../components/HotelCard";



const Search = () => {
  const [hotel, setHotel] = useState<HotelType[]>([])
  const [searchParam] = useSearchParams()
  const [pagination, setPagination] = useState<PaginationType>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const debonceFunc = setTimeout(() => {
      searchHotel()
    }, 2000)

    return () => clearTimeout(debonceFunc)

  }, [searchParam.toString()])

  const searchHotel = async () => {
    try {
      setLoading(true)
      const querySring = searchParam.toString()
      const res = await fetch(base_url + `/api/search?${querySring}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const { success, message, data, pagination } = await res.json()
      if (!res.ok && success === false) {
        setError(true)
        throw new Error(message)
      }
      setHotel(data)
      setPagination(pagination)
    } catch (error) {
      if (error instanceof Error) {
        setError(true);
        console.error(error.message);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className=" py-20 flex gap-4   max-w-6xl mx-auto relative">
      <div className="relative">
        <SideBar />
      </div>



      {
        error ? <NotFound /> : <>
          <div className="w-full">

            <div className="w-full flex flex-col gap-4">
              {
                loading ? loadingElem : <div>
                  {
                    hotel?.map((item) => (
                      // <div
                      //   key={item._id}
                      //   className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg border h-fit"

                      // >
                      //   <Link
                      //     to={`/hotel/${item._id}`}
                      //     className="w-40 aspect-square rounded-lg overflow-hidden "
                      //   >
                      //     <img src={item.photos[0]} alt="hotel image" className="w-full h-full object-cover" />
                      //   </Link>
                      //   <div className="flex justify-between gap-4 flex-1">
                      //     <div className="flex flex-col gap-1 flex-1 font-roboto">
                      //       <h1 className="text-2xl  font-semibold">{item.name}</h1>
                      //       <h2 className=" text-sm opacity-85 ">{item.title} </h2>
                      //       <div className="flex items-center gap-1 ">
                      //         <FaLocationDot /> <span>{item.city}</span>
                      //       </div>
                      //       <p className="  line-clamp-3">{item.description}</p>
                      //       <div className="text-lg ">
                      //         <b>{item.price} </b>/night
                      //       </div>

                      //     </div>
                      //     <div className="flex flex-col gap-4 justify-between">
                      //       <div className="w-fit self-end py-2 px-3 bg-blue-600 text-white rounded-md inline-block">
                      //         {item.rating}
                      //       </div>
                      //       <button className="btn self-end">Reserve</button>
                      //     </div>

                      //   </div>
                      // </div>
                      <HotelCard item={item} key={item._id} />
                    ))
                  }
                  <Pagination
                    page={Number(pagination?.page) || 1}
                    hasNextPage={pagination?.hasNextPage ?? false}
                    hasPrevPage={pagination?.hasPrevPage ?? false}
                  />
                </div>
              }

            </div>

          </div>

        </>
      }


    </section>
  );
};

export default Search;
