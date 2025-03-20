
import { useNavigate, useParams } from "react-router-dom";

import HotelCreateForm from "./HotelCreateForm";
import { useEffect, useState } from "react";
import { CreateHotelType } from "../lib/types";

const UpdateHotel = () => {
  const { id } = useParams();

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
  const [loading, setLoading] = useState(false)
  const [photoArray, setPhotoArray] = useState<any>([]);
  const [amenities, setAmenities] = useState<string[]>([])

  const navigate = useNavigate()



  useEffect(() => {
    const fetchHotel = async () => {
      const res = await fetch(`http://localhost:5000/api/hotel/${id}`);
      const data = await res.json();
      console.log(data);
      setHotel(data);
      setPhotoArray(data.photos);
    };
    fetchHotel()
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();


    setHotel((pre) => ({ ...pre, amenities: amenities, photos: photoArray.filter((item: any): item is string => typeof item === "string") }));

    if (hotel.photos.length === 0) return

    // const validateHotel = createHotelValidation.safeParse(hotel);
    // if (!validateHotel.success) {
    //   console.log(validateHotel.error);
    //   return;
    // }

    try {
      console.log('updating hotel...')
      setLoading(true)

      const res = await fetch(`http://localhost:5000/api/hotel/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(hotel),
      });
      if (!res.ok) {
        throw new Error("Failed to create hotel");
      }

      const data = await res.json();
      console.log("hotel updated successfullly", data);
      navigate("/admin/hotels")
      setLoading(false)

    }
    catch (error) {

      console.log(error);
      setLoading(false)
      throw new Error("Failed to update !")
    } finally {

      setLoading(false)
    }


  };



  return (
    <HotelCreateForm
      hotel={hotel} setHotel={setHotel} loading={loading} handleSubmit={handleSubmit} photoArray={photoArray} setPhotoArray={setPhotoArray} amenities={amenities} setAmenities={setAmenities} type="update" />
  );
};

export default UpdateHotel;
