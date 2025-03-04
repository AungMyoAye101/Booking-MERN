import { useSearchContext } from "../context/SearchContext";

const Search = () => {
  const search = useSearchContext();
  return (
    <section className="h-96 py-20">
      <div>{search?.destination}</div>
      <div>{search?.adultCount}</div>
      <div>{search?.childrenCount}</div>
    </section>
  );
};

export default Search;
