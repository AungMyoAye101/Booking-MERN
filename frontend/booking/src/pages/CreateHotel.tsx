import { useState } from "react";
import { CreateHotelType } from "../lib/types";
import { hotelInput } from "../config/createHotel";
import { MdOutlineCloudUpload } from "react-icons/md";
import { createHotelValidation } from "../lib/formValidation";

const CreateHotel = () => {
  const [hotel, setHotel] = useState<CreateHotelType>({
    name: "",
    title: "",
    description: "",
    photos: [],
    address: "",
    price: 0,
    city: "",
    rating: 0,
    distance: '',
    type: "",
  });

  const [photoArray, setPhotoArray] = useState<any>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setHotel((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setHotel((pre) => ({ ...pre, photos: photoArray }));

    if (hotel.photos.length === 0) return

    const validateHotel = createHotelValidation.safeParse(hotel);
    if (!validateHotel.success) {
      console.log(validateHotel.error);
      return;
    }

    try {


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



  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const promise = files.map((file) => {
      const reader = new FileReader();
      return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promise).then((result) => setPhotoArray(result));
  };


  return (
    <form onSubmit={handleSubmit} className="min-w-2xl flex flex-col  w-full gap-4 bg-white rounded-lg p-4 border">

      {
        hotelInput.map((item) => (

          <label htmlFor={item} className="flex flex-col gap-1  " key={item}>
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

      <label htmlFor='description' className="flex flex-col gap-1  flex-1" >
        <span className="font-roboto text-sm capitalize font-semibold">Description</span>
        <textarea
          id='description'
          name='description'
          placeholder='description'
          className="bg-neutral-100 rounded p-2 border w-full min-h-28"
          onChange={(e) => handleChange(e)}
        />
      </label>


      <label htmlFor="rating" className="flex flex-col gap-1 flex-1 ">
        <span className="font-roboto text-sm">Rating</span>
        <select
          name="rating"
          id="rating"
          className="bg-blue-100 outline-none p-2 rounded"
          onChange={(e) => handleChange(e)}
        >
          <option value='' disabled >Please provide a star rating</option>{
            [1, 2, 3, 4, 5].map((item) => (

              <option value={item} key={item}>{item}</option>
            ))
          }

        </select>
      </label>
      <label htmlFor="type" className="flex flex-col gap-1 flex-1 ">
        <span className="font-roboto text-sm">Type</span>
        <select
          name="type"
          id="type"
          className="bg-blue-100 outline-none p-2 rounded"
          onChange={(e) => handleChange(e)}
        >

          <option value="" disabled >
            Please select a type
          </option>
          {
            ["hotel", "aparment", "villa", "cabin", 'lodge'].map((item) => (
              <option value={item} key={item}>{item}</option>
            ))
          }

        </select>
      </label>


      <div>
        <label htmlFor="photo" className="flex flex-col gap-2 ">
          <div className="w-32 h-20 bg-neutral-200 rounded-lg flex justify-center items-center cursor-pointer">
            <MdOutlineCloudUpload className="text-4xl text-gray-400" />
          </div>
          <span className="font-roboto text-sm ">Please upload photo</span>
          <input
            disabled={photoArray.length >= 5}
            id="photo"
            type="file"
            name="photo"
            multiple
            onChange={handlePhotoChange}
            className="hidden"

          />
        </label>

      </div>

      <button
        type="submit"
        className="btn self-end"
      >
        Create Hotel
      </button>
    </form>
  );
};
export default CreateHotel
