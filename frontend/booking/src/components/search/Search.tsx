import "./search.css";

const Search = () => {
  return (
    <div className="input-container">
      <input type="text" placeholder="search hotel" />
      <input type="date" />
      <select name="" id="">
        <option value="Adult">Adult</option>
        <option value="children">children</option>
        <option value="children">children</option>
      </select>
      <button>Search</button>
    </div>
  );
};

export default Search;
