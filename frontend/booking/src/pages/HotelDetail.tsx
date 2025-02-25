import { BiHeart, BiShare, BiShareAlt } from "react-icons/bi";
import { FaLocationDot, FaShare } from "react-icons/fa6";

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
      <div className="grid grid-cols-4 gap-4 bg-green-400 py-4">
        <img
          src="https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740"
          alt="Dublin"
        />
        <img
          src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
          alt="Austin"
        />
        <img
          src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
          alt="London"
        />
        <img
          src="https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740"
          alt="Dublin"
        />
        <img
          src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
          alt="Austin"
        />
        <img
          src="https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740"
          alt="London"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-roboto font-semibold">Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo qui
          iusto, reprehenderit fuga atque quisquam cumque quae error placeat
          alias porro totam ab adipisci mollitia debitis maiores nam rem earum.
        </p>
        <h2 className="text-2xl font-roboto font-semibold">Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo qui
          iusto, reprehenderit fuga atque quisquam cumque quae error placeat
          alias porro totam ab adipisci mollitia debitis maiores nam rem earum.
        </p>
        <h2 className="text-2xl font-roboto font-semibold">Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo qui
          iusto, reprehenderit fuga atque quisquam cumque quae error placeat
          alias porro totam ab adipisci mollitia debitis maiores nam rem earum.
        </p>
        <h2 className="text-2xl font-roboto font-semibold">Description</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo qui
          iusto, reprehenderit fuga atque quisquam cumque quae error placeat
          alias porro totam ab adipisci mollitia debitis maiores nam rem earum.
        </p>
      </div>
    </section>
  );
};

export default HotelDetail;
