import { useState } from "react";
import { CreateHotelType } from "../lib/types";
import { useNavigate } from "react-router-dom";
import HotelCreateForm from "../components/HotelCreateForm";


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

  const [photoArray, setPhotoArray] = useState<(string | ArrayBuffer | null)[]>([]);
  const [amenities, setAmenities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    setHotel((pre) => ({ ...pre, amenities: amenities, photos: photoArray.filter((item): item is string => typeof item === "string") }));

    if (hotel.photos.length === 0) return

    // const validateHotel = createHotelValidation.safeParse(hotel);
    // if (!validateHotel.success) {
    //   console.log(validateHotel.error);
    //   return;
    // }

    try {
      console.log('creating hotel...')
      setLoading(true)

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
    <HotelCreateForm
      hotel={hotel}
      setHotel={setHotel}
      photoArray={photoArray}
      setPhotoArray={setPhotoArray}
      amenities={amenities}
      setAmenities={setAmenities}
      loading={loading}
      handleSubmit={handleSubmit}
      type="create"
    />
  );
};
export default CreateHotel
