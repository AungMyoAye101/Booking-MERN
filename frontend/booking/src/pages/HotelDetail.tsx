import { BiHeart, BiShare, BiShareAlt } from "react-icons/bi";
import { FaParking } from "react-icons/fa";

import { FaLocationDot, FaShare } from "react-icons/fa6";
import Review from "../components/Review";

const HotelDetail = () => {
  return (
    <section className=" py-16 max-w-6xl m-auto p-4">
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="text-2xl font-roboto font-bold">
            Hotel Mingalar Mandalay
          </h1>
          <div className="flex gap-2 items-center">
            <FaLocationDot />{" "}
            <p className="font-roboto font-semibold">
              19th street 30th between 31 Mandalay
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BiHeart className="text-2xl cursor-pointer" />{" "}
          <BiShareAlt className="text-2xl cursor-pointer" />
          <button>I'll reserve</button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className=" py-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            src="https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740"
            alt="Dublin"
            className="col-span-2 row-span-2 rounded-xl object-cover w-full h-full"
          />
          <img
            src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
            alt="Austin"
            className="rounded-xl object-cover w-full h-full"
          />
          <img
            src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
            alt="London"
            className="rounded-xl object-cover w-full h-full"
          />
          <img
            src="https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740"
            alt="Dublin"
            className="rounded-xl object-cover w-full h-full"
          />
          <img
            src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
            alt="Austin"
            className="rounded-xl object-cover w-full h-full"
          />
          <img
            src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
            alt="London"
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
        <Review />
      </div>

      <div className="flex  gap-4 justify-between">
        <p className="text-sm font-serif">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          aliquid laudantium non. Reprehenderit quas ullam fugiat sed nemo ea
          architecto tenetur, possimus placeat veniam maiores recusandae
          reiciendis voluptates exercitationem ratione. Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Possimus in, quos veniam quaerat
          cupiditate eum non saepe dicta modi provident repudiandae nemo tempore
          nisi magni expedita veritatis natus reiciendis. Voluptatem?
        </p>
        <div className=" bg-blue-100 rounded-lg shadow-lg w-72 min-w-72 p-4 flex flex-col gap-3">
          <h1 className="font-roboto font-semibold text-lg">
            Property highlight
          </h1>
          <h2 className="font-semibold font-roboto ">
            Perfect for 1 night stay
          </h2>
          <div className="flex gap-2 items-center ">
            <FaLocationDot />
            <p className="text-sm ">
              Top location: Highly rated by recent guests (8.7)
            </p>
          </div>
          <h2 className="font-semibold font-roboto ">Breakfast info</h2>
          <p className="text-sm font-roboto ">
            Continental, Vegetarian, Asian, American
          </p>
          <div className="flex gap-2 items-center ">
            <FaParking />
            <p className="text-sm ">Free parking available at the hotel</p>
          </div>
          <button className="w-full">Reserve</button>
        </div>
      </div>
    </section>
  );
};

export default HotelDetail;
