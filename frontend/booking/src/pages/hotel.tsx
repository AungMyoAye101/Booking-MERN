import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SearchResult from "./SearchResult";
import Search from "../components/Search";
import Filter from "../components/Filter";

const Hotel = () => {
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  // const { data, loading, error } = useFetch(`api/hotel/${hotelId}`);
  // console.log(data);
  return (
    <section className="relative py-14  max-w-6xl m-auto">
      <Search />
      <div className="flex gap-10 mt-6 ">
        <Filter />
        <SearchResult />
      </div>
    </section>
  );
};

export default Hotel;
