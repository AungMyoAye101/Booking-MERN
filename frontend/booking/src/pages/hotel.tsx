import useFetch from "../hooks/useFetch";
import SearchResult from "./SearchResult";
import Search from "../components/SearchBox";
import Filter from "../components/Filter";
import { useState } from "react";

const Hotel = () => {
  const [filterData, setFilterData] = useState({
    city: "",
    min: 1,
    max: 200,
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData((pre) => ({ ...pre, [name]: value }));
  };
  const { data, loading } = useFetch(
    `api/hotel?city=${filterData.city}&min=${filterData.min}&max=${filterData.max}}`
  );

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
