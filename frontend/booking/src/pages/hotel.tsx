import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import SearchResult from "./SearchResult";
import Search from "../components/Search";
import Filter from "../components/Filter";
import { useState } from "react";

const Hotel = () => {
  const [filterData, setFilterData] = useState({
    city: "",
    min: 1,
    max: 200,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((pre) => ({ ...pre, [name]: value }));
  };
  const { data, loading, error } = useFetch(
    `api/hotel?city=${filterData.city}&min=${filterData.min}&max=${filterData.max}}`
  );
  console.log(data);
  return (
    <section className="relative py-14  max-w-6xl m-auto">
      <Search />
      <div className="flex gap-10 mt-6 ">
        <Filter filterData={filterData} handleChange={handleChange} />
        <SearchResult data={data} loading={loading} />
      </div>
    </section>
  );
};

export default Hotel;
