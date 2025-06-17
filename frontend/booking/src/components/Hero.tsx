import SearchBox from "./SearchBox";

const Hero = () => {
  return (
    <section className="h-[100vh] relative ">
      <div className="max-w-6xl m-auto p-4 w-full h-full flex flex-col gap-1 justify-center text-white relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-roboto hero-stroke">Find your next stay</h1>
        <p className="text-2xl md:text-3xl font-roboto hero-stroke">
          Search low prices on hotels, homes and much more...
        </p>
        <div className="relative z-30 w-full">

          <SearchBox />
        </div>
      </div>

      <img src="/assets/images/hotelbackground.jpg" alt="hotel background photo" className="absolute inset-0 object-cover w-full h-full " />

    </section>
  );
};

export default Hero;
