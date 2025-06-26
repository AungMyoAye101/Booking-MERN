import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HotelType } from "../lib/types";
import { base_url, loadingElem } from "../lib/helper";
import Pagination, { PaginationType } from "../components/Pagination";
import { showToast } from "../context/ToastProvider";
import { RiHotelLine } from "react-icons/ri";
const HotelList = () => {

  const [search] = useSearchParams()
  const page = search.get("page") || "1";
  const limit = search.get("limit") || "4";
  const [data, setData] = useState<HotelType[]>([])
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    hasNextPage: false,
    hasPrevPage: false
  })
  const [loading, setLoading] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(false)
  const [selection, setSelection] = useState({
    _id: "",
    name: "",
    type: "",
  })
  const fetchHotel = async () => {
    try {
      setLoading(true)
      const res = await fetch(base_url + `/api/hotel?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      })
      const { success, message, data, pagination } = await res.json()
      if (!res.ok && success === false) {
        throw new Error(message)
      }
      setData(data)
      setPagination(pagination)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchHotel()
  }, [search.toString()])


  useEffect(() => {
    if (toggleDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleDelete]);

  const handleOpen = (_id: string, name: string, type: string) => {
    setToggleDelete(!toggleDelete);
    setSelection({
      _id,
      name,
      type
    })//toggle the delete modal
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${base_url}/api/hotel/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw Error("Failed to delete hotel");
      }
      setToggleDelete(false);
      showToast('info', "Hotel was deleted")
      const filterHotel = data.filter(item => item._id !== id)
      setData(filterHotel)

    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  };

  return (
    <section className="w-full flex flex-col gap-6  py-12">

      {
        loading ? loadingElem :

          data.map((item) => (
            <div
              key={item._id}
              className="flex-1 flex flex-col md:flex-row gap-4 bg-white rounded-lg p-4 shadow-lg border relative "

            >
              <Link
                to={`/hotel/${item._id}`}
                className="w-full aspect-video md:w-40 md:aspect-square rounded-lg overflow-hidden "
              >
                <img src={item.photos[0]} alt="hotel image" className="w-full h-full object-cover" />
              </Link>
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-full md:w-[50%]">
                  <h1 className="text-2xl font-roboto font-semibold">{item.name}</h1>
                  <div className="flex gap-1 items-center "><RiHotelLine /> <span>{item.type}</span></div>
                  <h2 className="font-roboto text-neutral-600 text-lg ">{item.title} </h2>
                  <p className="line-clamp-3 text-sm">{item.description}</p>

                </div>
                <div className="self-end flex gap-4">
                  <Link to={`/admin/updateHotel/${item._id}`} className="btn text-xs md:text-sm">
                    Update
                  </Link>
                  <Link to={`/admin/room/${item._id}`} className="btn text-xs md:text-sm">
                    Add room
                  </Link>
                  <button onClick={() => handleOpen(item._id, item.name, item.type)} className="btn text-xs md:text-sm bg-rose-600">
                    Delete
                  </button>
                </div>
              </div>

              {
                toggleDelete && (<div className="absolute z-10 px-4 inset-0 flex justify-center items-center bg-black bg-opacity-25">
                  <div className="flex flex-col  gap-4 p-4 rounded-lg shadow-lg  bg-white">
                    <h2 className="font-roboto text-center text-xl ">
                      Are you sure,you want to delete this <i className="font-semibold">{selection.name}
                      </i> {selection.type}.
                    </h2>
                    <div className="flex items-center gap-4 self-end">
                      <button className="btn text-sm bg-neutral-400"
                        onClick={() => setToggleDelete(false)}
                      >Cancel</button>
                      <button className="btn text-sm bg-red-600"
                        onClick={() => handleDelete(selection._id)}
                      >Delete</button>
                    </div>
                  </div>
                </div>)
              }

            </div>
          ))

      }

      <Pagination page={Number(pagination?.page) || 1} hasNextPage={pagination?.hasNextPage} hasPrevPage={pagination?.hasPrevPage} />

    </section>
  );
};

export default HotelList;
