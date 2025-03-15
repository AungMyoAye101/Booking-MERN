
import { useParams } from "react-router-dom";

import HotelCreateForm from "./HotelCreateForm";

const UpdateHotel = () => {
  const { id } = useParams();
  return (
    <HotelCreateForm id={id!} />
  );
};

export default UpdateHotel;
