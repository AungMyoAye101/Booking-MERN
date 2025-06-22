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
      <div className="relative hidden md:block">
        <SideBar />
      </div>



      {
        error ? <NotFound /> : <>
          <div className="w-full">

            <div className="w-full flex flex-col gap-4">
              {
                loading ? loadingElem : <div className="space-y-4 px-4 ">
                  {
                    hotel?.map((item) => (
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
