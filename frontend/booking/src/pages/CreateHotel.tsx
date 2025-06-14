import { useState } from "react";
import { CreateHotelType } from "../lib/types";
import { useNavigate } from "react-router-dom";
import HotelCreateForm from "../components/HotelCreateForm";
import { base_url } from "../lib/helper";
import { useForm } from "react-hook-form";


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
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="bg-white border p-12 w-96  mx-auto mt-20 flex flex-col gap-4">

      <input type="file" name="photos" multiple onChange={e => setPhotoArray(Array.from(e.target.files))} className="input_con" />
      <button className="btn " type="submit">Post</button>
    </form>
  );
};
export default CreateHotel
