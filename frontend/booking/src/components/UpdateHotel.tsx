
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
    amenites: [],
    type: "",
  });
  const [loading, setLoading] = useState(false)
  const [photoArray, setPhotoArray] = useState<any>([]);
  const [amenites, setAmenites] = useState<string[]>([])

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


    setHotel((pre) => ({ ...pre, amenites, photos: photoArray.filter((item: any): item is string => typeof item === "string") }));

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
    <HotelCreateForm hotel={hotel} setHotel={setHotel} loading={loading} handleSubmit={handleSubmit} photoArray={photoArray} setPhotoArray={setPhotoArray} amenites={amenites} setAmenites={setAmenites} />
  );
};

export default UpdateHotel;
