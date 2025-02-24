import { useRef } from "react";

const Destination = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSlide = (isRight: boolean) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: isRight ? 300 : -300,
        behavior: "smooth",
      });
    }
  };
  const list = [
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      city: "Dublin",
      count: 0,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      city: "Austin",
      count: 10,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      city: "Dublin",
      count: 0,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      city: "Austin",
      count: 10,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      city: "London",
      count: 122,
    },
  ];
  return (
    <section className="mb-4">
      <h1 className="text-4xl font-roboto font-semibold mb-2 ">
        Trending Destinations
      </h1>
      <div className="relative">
        <button
          onClick={() => handleSlide(false)}
          className="bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute left-0 top-[50%] translate-y-[-50%]"
        >
          p
        </button>
        <button
          onClick={() => handleSlide(true)}
          className="bg-white flex items-center justify-center text-black z-10 rounded-full w-10 h-10 absolute right-0 top-[50%] translate-y-[-50%]"
        >
          n
        </button>
        <main
          ref={containerRef}
          className="flex gap-4 overflow-hidden flex-nowrap  relative"
        >
          {list.map((item, i) => (
            <div
              key={i}
              className="min-w-[300px] aspect-video rounded-lg overflow-hidden relative "
            >
              <img
                src={item.url}
                alt="image"
                className="w-full h-auto hover:scale-125 transition-transform ease-in-out "
              />
              <h2 className="absolute top-4 left-4 text-white font-roboto text-2xl font-bold">
                {item.city}
              </h2>
            </div>
          ))}
        </main>
      </div>
    </section>
  );
};

export default Destination;
