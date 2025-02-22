import { useState } from "react";
import "./search.css";
import useFetch from "../../hooks/usefetch";

const Search = () => {
  const [searchData, setSearchData] = useState({
    text: "",
  });

  const handleChange = (e: any) => {
    console.log(searchData);
    const { name, value } = e.target;
    setSearchData((pre) => ({ ...pre, [name]: value }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/hotel?name=${searchData.text}&limit=4`
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="input-container">
      <input
        type="text"
        placeholder="search hotel"
        name="text"
        value={searchData.text}
        onChange={(e) => handleChange(e)}
      />
      <input type="date" />
      <select name="" id="">
        <option value="Adult">Adult</option>
        <option value="children">children</option>
        <option value="children">children</option>
      </select>
      <button onClick={onSubmit}>Search</button>
    </form>
  );
};

export default Search;
