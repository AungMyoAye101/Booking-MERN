import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useRef } from "react";
import { PiGreaterThan, PiLessThan } from "react-icons/pi";
const HotelList = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSlide = (isRight: boolean) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: isRight ? 300 : -300,
        behavior: "smooth",
      });
    }
  };
  const { data, loading, error } = useFetch("api/hotel?featured=true&limit=4");
  console.log(data);
  const list = [
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
  ];
  return (
    <section>
      <h1 className="text-4xl font-semibold font-roboto">Home Guess Love</h1>
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
          {list.map((item, i) => (
            <Link
              to={`hotel/${item.title}`}
              key={i}
              className="min-w-[250px]  relative rounded-lg overflow-hidden shadow-lg cursor-pointer bg-white"
            >
              <div className=" overflow-hidden">
                <img
                  src={item.url}
                  alt="image"
                  className="w-full h-auto hover:scale-125 transition-transform ease-in-out "
                />
              </div>
              <div className="py-4 px-2 flex flex-col gap-1">
                <p className="text-sm opacity-90">hotel</p>
                <h2 className="  font-roboto text-xl font-semibold">
                  {item.title}
                </h2>
                <div className="flex gap-1 items-center">
                  <div className="bg-blue-800 py-1 px-1.5 text-white text-sm rounded">
                    {item.rating}
                  </div>
                  <span className="text-sm ">144reviews</span>
                </div>
                <div className="self-end font-roboto">
                  <span className="text-sm ">Starting from </span>
                  <span className="font-semibold ml-1">${item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </main>
      </div>
    </section>
  );
};

export default HotelList;
