import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SearchResult from "./SearchResult";
import Search from "../components/Search";

const Hotel = () => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`api/hotel/${hotelId}`);
  console.log(data);
  return (
    <section className="relative py-14 bg-red-400">
      <div className="max-w-6xl m-auto ">
        <Search />
      </div>
      <div>
        <SearchResult />
      </div>
    </section>
  );
};

export default Hotel;
