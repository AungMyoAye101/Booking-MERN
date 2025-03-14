import { useEffect, useState } from "react";
// import { FaX } from "react-icons/fa6";
import { CreateHotelType } from "../lib/types";
// import { createHotelValidation } from "../lib/formValidation";
import { hotelInput } from "../config/createHotel";

const CreateHotel = () => {
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

  const [photoArray, setPhotoArray] = useState<any>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHotel((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  // const handleKeyDown = (e: any, type: string) => {
  //   if (e.key === "Enter") {
  //     if (type === "photo") {
  //       setPhotoArray((pre) => [...pre, url]);
  //       setUrl("");
  //     }
  //     if (type === "distance") {
  //       setDistanceArray((pre) => [...pre, distance]);
  //       setDistance("");
  //     }
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    console.log('submit');
    setHotel((pre) => ({ ...pre, photos: photoArray }));

    if (hotel.photos.length === 0) return

    try {
      console.log(hotel);

      const res = await fetch("http://localhost:5000/api/hotel/create-hotel", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(hotel),
      });
      if (!res.ok) {
        throw new Error("Failed to create hotel");
      }
      const data = await res.json();
      console.log("hotel create successfullly", data);
    }
    catch (error) {
      console.log(error);
    }

  };

  const handlePhotoChange = (e: any) => {
    const files = Array.from(e.target.files);

    if (files.length == 0) return

    const promise = files.map((file: any) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        }
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      })

    })

    Promise.all(promise).then((result) => setPhotoArray(result))

  }


  return (
    <form onSubmit={handleSubmit} className="min-w-2xl flex flex-col  w-full gap-4 bg-white rounded-lg p-4 border">
      {
        hotelInput.map((item) => (

          <label htmlFor={item} className="flex flex-col gap-1  flex-1" key={item}>
            <span className="font-roboto text-sm capitalize font-semibold">{item}</span>
            <input
              id={item}
              type="text"
              name={item}
              placeholder={item}
              className="bg-neutral-100 rounded p-2 border w-full"
              onChange={(e) => handleChange(e)}
            />
          </label>
        ))
      }


      <label htmlFor="type" className="flex flex-col gap-1 flex-1 ">
        <span className="font-roboto text-sm">Type</span>
        <select
          name="type"
          id="type"
          className="bg-blue-100 outline-none p-2 rounded"
          onChange={(e) => handleChange(e)}
        >
          <option value=""  >

          </option>
          <option value="hotel"  >
            Hotel
          </option>
          <option value="aparment">Aparment</option>
          <option value="villa">Villa</option>
          <option value="cabin">Cabin</option>
        </select>
      </label>


      <div>
        <label htmlFor="photo" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Photo</span>
          <input
            disabled={photoArray.length >= 5}
            id="photo"
            type="file"
            name="photo"
            multiple
            onChange={handlePhotoChange}
          />
        </label>
        {/* <div className="flex gap-2 items-center mt-2">
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
        </div> */}
      </div>
      {/* <div>
        <label htmlFor="distance" className="flex flex-col gap-1 flex-1">
          <span className="font-roboto text-sm">Distance</span>
          <input
            disabled={distanceArray.length >= 2}
            id="distance"
            type="text"
            name="distance"
            value={distance}
            placeholder="enter a distance to add more"
            className={`bg-neutral-100 rounded p-2 border ${distanceArray.length >= 2 ? "cursor-not-allowed" : ""
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
      </div> */}


      <button
        type="submit"
        className="btn h-fit"
      >
        Create Hotel
      </button>
    </form>
  );
};
export default CreateHotel
