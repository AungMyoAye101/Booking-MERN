import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Hotel = () => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`api/hotel/${hotelId}`);
  console.log(data);
  return (
    <section className="hotel-con">
      <div>
        {/* <h1>{data.name}</h1>
        <p>{data.description}</p> */}
      </div>
    </section>
  );
};

export default Hotel;
