import { useState } from "react";

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
    <section className="search-container">
      <div>
        <div>
          <span>icon</span>
          <input type="text" />
        </div>
      </div>
    </section>
  );
};

export default Search;
