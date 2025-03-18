import { useState } from "react";
import { CreateHotelType } from "../lib/types";
import { hotelFacilities, hotelInput, hotelTypes } from "../config/createHotel";
import { MdOutlineCloudUpload } from "react-icons/md";
import { createHotelValidation } from "../lib/formValidation";
import { useNavigate } from "react-router-dom";


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
    amenites: [],
    type: "",
  });

  const [photoArray, setPhotoArray] = useState<(string | ArrayBuffer | null)[]>([]);
  const [amenites, setAmenites] = useState<string[]>([])
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setHotel((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleAmenitesChange = (amenity: string) => {
    setAmenites((pre) => (amenites.includes(amenity) ? amenites.filter(a => a !== amenity) : [...pre, amenity]))

  }


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setHotel((pre) => ({ ...pre, amenites, photos: photoArray.filter((item): item is string => typeof item === "string") }));

    if (hotel.photos.length === 0) return

    // const validateHotel = createHotelValidation.safeParse(hotel);
    // if (!validateHotel.success) {
    //   console.log(validateHotel.error);
    //   return;
    // }

    try {
      console.log('creating hotel...')

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
      navigate("/admin/hotels")

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
      return new Promise<string | null>((resolve, reject) => {
        reader.onloadend = () => {
          if (reader.result) resolve(reader.result as string);

        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promise).then((result) => setPhotoArray((pre) => [...pre, ...result]));
  };

  console.log(hotel);


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
        <span className="font-roboto text-sm font-semibold">Rating</span>
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

      {/* hotel type  */}
      <div className="flex flex-col gap-1 flex-1 ">
        <span className="font-roboto text-sm font-semibold">Please choose a type</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {
            hotelTypes.map((item) => (
              <label key={item} className={`font-serif px-4 py-1.5 text-sm rounded-lg ${hotel.type === item ? 'bg-blue-500 text-white' : "bg-neutral-200"} `}>

                <input type="radio" value={item} name="type" checked={hotel.type === item} onChange={(e) => handleChange(e)} className="hidden" />
                <span>{item}</span>
              </label>
            ))
          }
        </div>
      </div>

      {/* hotel amenites */}
      <div className="flex flex-col gap-1 flex-1 ">
        <span className="font-roboto text-sm font-semibold">Please Select Amenities:</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-2">

          {
            hotelFacilities.map((item) => (
              <label key={item} className={`font-serif px-4 py-1.5 text-sm flex items-center gap-1`}>

                <input type="checkbox" value={item} name="amenities" checked={amenites.includes(item)} onChange={() => handleAmenitesChange(item)} />
                <span>{item}</span>
              </label>
            ))
          }
        </div>
      </div>


      <div className="flex gap-4">
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
        {
          photoArray.length > 0 && photoArray
            .filter((item): item is string => typeof item === "string")
            .map((item, index) => (
              <div className="relative" key={index}>
                <button
                  type="button"
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-sm"
                  onClick={() => setPhotoArray((pre) => pre.filter((_, i) => i !== index))}
                >
                  X
                </button>
                <img src={item} alt="hotel image" className="w-28 h-20 object-cover rounded-lg hover:shadow-md" />
              </div>

            ))
        }
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
