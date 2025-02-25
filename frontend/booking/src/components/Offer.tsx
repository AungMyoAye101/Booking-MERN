import React from "react";

const Offer = () => {
  return (
    <section className="py-10 max-w-6xl  m-auto  ">
      <div className="my-4">
        <h1 className="text-3xl font-bold font-roboto">Offers</h1>
        <p className="font-roboto">
          Promotions, deals and special offers for you
        </p>
      </div>
      <div className=" w-full  border bg-white border-gray-100 rounded-lg shadow-lg flex justify-between  gap-4  relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-blue-500 absolute -left-6 top-10 "></div>
        <div className="w-20 h-20 rounded-full bg-blue-500 absolute right-96 -bottom-10 "></div>
        <div className="  flex justify-center w-full overflow-hidden text-black">
          <div className="flex flex-col gap-2 justify-center">
            <h2 className="text-2xl font-semibold font-roboto">
              Save on stays worldwide
            </h2>
            <p className="font-roboto text-lg">
              Start your year with a sense of adventure, saving 15% or more with
              Early 2025 Deals.
            </p>
            <button className="w-fit">Save 15% or more</button>
          </div>
        </div>
        <div className="px-2">
          <img
            src="./assets/images/travel-model.png"
            alt="travel model girl"
            className="w-80 h-auto aspect-square"
          />
        </div>
      </div>
    </section>
  );
};

export default Offer;
