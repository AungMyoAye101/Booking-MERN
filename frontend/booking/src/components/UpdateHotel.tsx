import React, { useEffect, useState } from "react";
import { createHotelValidation } from "../lib/formValidation";
import { CreateHotelType } from "../lib/types";
import useFetch from "../hooks/useFetch";

const UpdateHotel = () => {
  const [hotel, setHotel] = useState<CreateHotelType>({
    name: "",
    title: "",
    description: "",
    photos: [],
    address: "",
    cheapestPrice: 0,
    city: "",
    distance: [],
    type: "",
  });

  const [photoArray, setPhotoArray] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [distanceArray, setDistanceArray] = useState<string[]>([]);
  const [distance, setDistance] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(`http://localhost:5000/api/hotel/${""}`, {
        method: "GET",
        headers: { "Content-type": "application/json" },
      });
      if (!res.ok) {
        throw Error("Failed to fetch hotel ");
      }
      const data = await res.json();
      console.log(data);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotel((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleKeyDown = (e: any, type: string) => {
    if (e.key === "Enter") {
      if (type === "photo") {
        setPhotoArray((pre) => [...pre, url]);
        setUrl("");
      }
      if (type === "distance") {
        setDistanceArray((pre) => [...pre, distance]);
        setDistance("");
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setHotel((prev) => ({
      ...prev,
      photos: photoArray,
      distance: distanceArray,
    }));
    if (hotel.photos.length === 0 || hotel.distance.length === 0) {
      return;
    }

    try {
      const validatedHotel = createHotelValidation.parse(hotel);
      if (validatedHotel) {
        const res = await fetch("http://localhost:5000/api/hotel", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(hotel),
        });
        if (!res.ok) {
          throw new Error("Failed to create hotel");
        }
        console.log("hotel create successfullly");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(hotel);
  };

  return (
    <form className="min-w-2xl flex flex-col  w-full gap-4 bg-white rounded-lg p-4 border">
      <label htmlFor="name" className="flex flex-col gap-1  flex-1">
        <span className="font-roboto text-sm">Name</span>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="hotel name"
          className="bg-neutral-100 rounded p-2 border w-full"
          onChange={(e) => handleChange(e)}
        />
      </label>

      <label htmlFor="title" className="flex flex-col gap-1  flex-1">
        <span className="font-roboto text-sm">Title</span>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="title"
          className="bg-neutral-100 rounded p-2 border"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="type" className="flex flex-col gap-1 flex-1 ">
        <span className="font-roboto text-sm">Type</span>
        <select
          name="type"
          id="type"
          className="bg-blue-100 outline-none p-2 rounded"
          onChange={(e) => handleChange(e)}
        >
          <option value="hotel" selected>
            Hotel
          </option>
          <option value="aparment">Aparment</option>
          <option value="villa">Villa</option>
          <option value="cabin">Cabin</option>
        </select>
      </label>

      <label htmlFor="description" className="flex flex-col gap-1 flex-1">
        <span className="font-roboto text-sm">Description</span>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="description"
          className="bg-neutral-100 rounded p-2 border"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <div>
        <label htmlFor="photo" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Photo</span>
          <input
            disabled={photoArray.length >= 5}
            id="photo"
            type="text"
            name="photo"
            value={url}
            placeholder="enter a photo url to add more"
            className="bg-neutral-100 rounded p-2 border"
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "photo")}
          />
        </label>
        <div className="flex gap-2 items-center mt-2">
          {photoArray.length > 0 &&
            photoArray.map((n, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-gray-200 rounded-md w-32 gap-2 px-1.5 py-1 bg-blue-50  hover:bg-rose-100"
              >
                <span className="text-xs line-clamp-1">{n}</span>
                <FaX
                  onClick={() =>
                    setPhotoArray(() => photoArray.filter((_, y) => y !== i))
                  }
                  className=" text-xs cursor-pointer"
                />
              </div>
            ))}
        </div>
      </div>
      <div>
        <label htmlFor="distance" className="flex flex-col gap-1 flex-1">
          <span className="font-roboto text-sm">Distance</span>
          <input
            disabled={distanceArray.length >= 2}
            id="distance"
            type="text"
            name="distance"
            value={distance}
            placeholder="enter a distance to add more"
            className={`bg-neutral-100 rounded p-2 border ${
              distanceArray.length >= 2 ? "cursor-not-allowed" : ""
            }`}
            onChange={(e) => setDistance(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "distance")}
          />
        </label>
        <div className="flex gap-2 items-center mt-2">
          {distanceArray.length > 0 &&
            distanceArray.map((n, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-gray-200 rounded-md w-32 gap-2 px-1.5 py-1 bg-blue-50  hover:bg-rose-100"
              >
                <span className="text-xs line-clamp-1">{n}</span>
                <FaX
                  onClick={() =>
                    setDistanceArray(() =>
                      distanceArray.filter((_, y) => y !== i)
                    )
                  }
                  className=" text-xs cursor-pointer"
                />
              </div>
            ))}
        </div>
      </div>

      <label htmlFor="city" className="flex flex-col gap-1 flex-1">
        <span className="font-roboto text-sm">City</span>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="city"
          className="bg-neutral-100 rounded p-2 border"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="address" className="flex flex-col gap-1 flex-1">
        <span className="font-roboto text-sm">address</span>
        <input
          id="address"
          type="text"
          name="address"
          placeholder="address"
          className="bg-neutral-100 rounded p-2 border"
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="cheapestPrice" className="flex flex-col gap-1 flex-1">
        <span className="font-roboto text-sm"> Cheapest Price</span>
        <input
          id="cheapestPrice"
          type="number"
          name="cheapestPrice"
          placeholder="0"
          className="bg-neutral-100 rounded p-2 border"
          onChange={(e) => handleChange(e)}
        />
      </label>

      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="btn h-fit"
      >
        Create Hotel
      </button>
    </form>
  );
};

export default UpdateHotel;
