import { useState } from "react";
import { CreateHotelType, HotelType } from "../lib/types";
import { useNavigate } from "react-router-dom";
import HotelCreateForm from "../components/HotelCreateForm";
import { base_url } from "../lib/helper";
import { useForm } from "react-hook-form";
import { hotelInput, hotelInputValidation } from "../config/createHotel";


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
    amenities: [],
    type: "",
  });

  const [photoArray, setPhotoArray] = useState<(File[])>([]);
  const [amenities, setAmenities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {

    console.log(photoArray)
    // setHotel((pre) => ({ ...pre, amenities: amenities }));
    const formData = new FormData();

    if (photoArray.length <= 0) return console.log("no photos")
    photoArray.forEach(img => (formData.append("photos", img)))

    // Append other fields to formData
    Object.keys(data).forEach((key) => {
      if (key !== "photos") {
        formData.append(key, data[key]);
      }
    });

    console.log(formData)
    try {
      console.log('creating hotel...')
      setLoading(true)

      const res = await fetch(base_url + "/api/hotel/create-hotel", {
        method: "POST",
        body: formData

      });
      const data = await res.json();
      if (!res.ok && data.success === false) {
        throw new Error(data.message);
      }


      console.log(data.message);
      // navigate("/admin/hotels")
      setLoading(false)

    }
    catch (error) {

      console.log(error);
      setLoading(false)
      throw new Error("Failed to create !")
    } finally {

      setLoading(false)
    }


  };


  return (
    // <HotelCreateForm
    //   hotel={hotel}
    //   setHotel={setHotel}
    //   setPhotoArray={setPhotoArray}
    //   amenities={amenities}
    //   setAmenities={setAmenities}
    //   loading={loading}
    //   handleSubmit={handleSubmit}
    //   type="create"
    // />
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="min-h-screen bg-white border p-12 w-96  mx-auto mt-20 flex flex-col gap-4 font-roboto">
      {
        hotelInputValidation.map(field => (
          <div className="flex flex-col gap-1 " key={field.name}>
            <label htmlFor={field.name} className="capitalize font-medium">

              {field.label}
            </label>
            <input
              type="text"
              {...register(field.name, field.config)}
              placeholder={field.placeholder}
              className="input_con"
            />
            {
              errors[field.name] && <p className="text-red-600 ">{errors[field.name]?.message as string}</p>
            }

          </div>
        ))

      }
      <div className="flex flex-col gap-1">
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required." })}
          className="min-h-20 bg-neutral-200 focus:outline-blue-400 p-2" />
        {
          errors.description && <p className="text-red-600 ">{errors.description.message as string}</p>
        }
      </div>
      <input type="file" name="photos" multiple onChange={e => setPhotoArray(Array.from(e.target.files))} className="input_con" />
      <button className="btn " type="submit">Post</button>
    </form>
  );
};
export default CreateHotel
