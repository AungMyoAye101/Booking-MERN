import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";



const Search = () => {

  const { searchData, loading } = useSearch()

  return (
    <section className="h-96 py-20">
      {
        loading ? <h1>Loading...</h1> : searchData?.map((item) => (
          <div
            key={item._id}
            className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg "

          >
            <Link
              to={`/hotel/${item._id}`}
              className="w-40 aspect-square rounded-lg overflow-hidden "
            >
              <img src={item.photos[0]} alt="hotel image" className="w-full h-full object-cover" />
            </Link>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex justify-between items-center">

                <h1 className="text-2xl font-roboto font-semibold">{item.name}</h1>
                <div className="py-1 px-2 bg-blue-600 text-white rounded-md inline-block">
                  {item.rating}
                </div>
              </div>
              <h2 className="font-roboto text-sm opacity-85 ">{item.title} </h2>
              <p className=" ">{item.description}</p>
              <button className="btn self-end">Reserve</button>
            </div>
          </div>
        ))

      }

    </section>
  );
};

export default Search;
