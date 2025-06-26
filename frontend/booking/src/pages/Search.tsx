import { useSearchParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { base_url, loadingElem } from "../lib/helper";
import { HotelType } from "../lib/types";
import NotFound from "./NotFound";
import Pagination, { PaginationType } from "../components/Pagination";
import HotelCard from "../components/HotelCard";
import MobileSideBar from "../components/MobileSideBar";



const Search = () => {
  const [hotel, setHotel] = useState<HotelType[]>([])
  const [pagination, setPagination] = useState<PaginationType>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)


  const [searchParams, setSearchParams] = useSearchParams()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateParams = new URLSearchParams(searchParams)
    const { name, value, checked } = e.target

    if (name === 'rating') {
      const currentRating = searchParams.get('rating')?.split(',') || []
      let updateRating = checked ? [...currentRating, value] : currentRating.filter(r => r !== value)
      updateRating = [...new Set(updateRating)].sort()
      console.log("update rating", updateRating)

      if (updateRating.length > 0) {
        updateParams.set("rating", updateRating.join(','))
      } else {
        updateParams.delete("rating")
      }
    } else if (!value || value === '') {
      updateParams.delete(name)
    } else {
      updateParams.set(name, value)
    }
    setSearchParams(updateParams)
  }


  useEffect(() => {
    const debounceFunc = setTimeout(() => {
      searchHotel()
    }, 2000)

    return () => clearTimeout(debounceFunc)

  }, [searchParams.toString()])

  const searchHotel = async () => {
    try {
      setLoading(true)
      const queryString = searchParams.toString()
      const res = await fetch(base_url + `/api/search?${queryString}`, {
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
    <section className=" py-20 gap-4   max-w-6xl mx-auto relative overflow-hidden space-y-4">

      <div className="md:hidden">

        <MobileSideBar searchParams={searchParams} handleChange={handleChange} />
      </div>

      <div className="flex ">
        <div className="relative hidden md:block">
          <SideBar searchParams={searchParams} handleChange={handleChange} />
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

      </div>





    </section>
  );
};

export default Search;
