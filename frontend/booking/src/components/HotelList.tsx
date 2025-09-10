import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PiGreaterThan, PiLessThan } from "react-icons/pi";
import { base_url } from "../lib/helper";
import { HotelType } from "../lib/types";
import { FaLocationDot } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const HotelList = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<HotelType[]>([])
    const [loading, setLoading] = useState(false)
    const handleSlide = (isRight: boolean) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: isRight ? 300 : -300,
                behavior: "smooth",
            });
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch(base_url + "/api/hotel", {
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
            if (error instanceof Error) console.log(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])



    return (
        <section >
            <h1 className="text-4xl font-semibold font-roboto">Home Guess Love</h1>
            <div className="relative">
                <button
                    onClick={() => handleSlide(false)}
                    className="shadow-sm border bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute left-0 top-[50%] translate-y-[-50%]"
                >
                    <PiLessThan />
                </button>
                <button
                    onClick={() => handleSlide(true)}
                    className="shadow-sm border bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute right-0 top-[50%] translate-y-[-50%]"
                >
                    <PiGreaterThan />
                </button>
                <main
                    ref={containerRef}
                    className="flex gap-4 overflow-hidden flex-nowrap  relative py-4"
                >
                    {
                        data && loading ? [1, 2, 3, 4, 5, 6,].map(i => (<div key={i} className="min-w-60 max-w-80 bg-white border border-white shadow-md p-2 rounded">
                            <div className="w-full h-52 bg-neutral-200 rounded-md"></div>
                            <div className="flex flex-col mt-1 gap-1">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="w-20 h-4 rounded bg-neutral-200"></div>
                                    <div className="w-10 h-4 rounded bg-neutral-200"></div>
                                </div>
                                <div className="rounded w-24 h-4 bg-neutral-200"></div>
                                <div className="rounded w-20 h-4 bg-neutral-200"></div>
                                <div className="rounded w-20 h-4 bg-neutral-200 self-end"></div>
                            </div>
                        </div>)) : data.map((item, i) => (
                            <Link
                                to={`hotel/${item._id}`}
                                key={i}
                                className=" min-w-[300px] w-fit border   relative rounded-lg overflow-hidden shadow-md cursor-pointer bg-white hover:shadow-lg "
                            >
                                <div className="h-48  overflow-hidden  ">
                                    <img
                                        src={item.photos[0]}
                                        alt="image"
                                        className="w-full h-full hover:scale-125 transition-transform ease-in-out  object-cover"
                                    />
                                </div>
                                <div className="px-3 py-2 flex flex-col ">
                                    <div className="flex justify-between items-center gap-4">
                                        <p className="text-sm opacity-90">{item.type}</p>
                                        <div className="flex items-center gap-1">
                                            <FaStar className="text-orange-400" /> {item.rating}
                                        </div>
                                    </div>

                                    <h2 className="  font-roboto text-xl font-semibold">
                                        {item.name}
                                    </h2>
                                    <h2 className="  font-roboto text-sm opacity-80 flex  items-center gap-1">
                                        <FaLocationDot /> {item.city}
                                    </h2>

                                    <div className="self-end font-roboto text-xl">
                                        <span className="font-semibold ">
                                            ${item.price}
                                        </span>
                                        <span className=" opacity-90">/night</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }

                </main>
            </div>
        </section>
    );
};

export default HotelList;
