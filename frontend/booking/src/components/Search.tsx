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
    <div className="w-full p-2  bg-blue-400 flex gap-1 rounded-lg ">
      <div className="flex-1 bg-white  h-10 flex items-center rounded-md">
        <span>icon</span>
        <input
          type="text"
          placeholder="Where are you going?"
          className="h-full w-full ml-1 flex-1"
        />
      </div>
      <div className="flex-1 bg-white  h-10 flex items-center gap-2 rounded-md">
        <input type="date" className="h-full" />
        <input type="date" className="h-full  " />
      </div>
      <div className="flex-1 bg-white  h-10 flex items-center rounded-md">
        <input type="text" placeholder="adult" />
      </div>
      <button>search</button>
    </div>
  );
};

export default Search;
