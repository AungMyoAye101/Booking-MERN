import "./search.css";

const Search = () => {
  return (
    <div className="input-container">
      <input type="text" placeholder="search hotel" />
      <input type="date" />
      <button>Search</button>
    </div>
  );
};

export default Search;
