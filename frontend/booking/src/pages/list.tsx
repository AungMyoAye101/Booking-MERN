import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const List = () => {
  const { data, loading } = useFetch("api/hotel?limit=10");
  console.log(data);
  return (
    <section className="w-full flex flex-col gap-6">
      {data.map((item) => (
        <div
          key={item._id}
          className="flex-1 flex gap-4 bg-white rounded-lg p-4 shadow-lg"
        >
          <Link
            to={`/hotel/${item._id}`}
            className="w-40 aspect-square rounded-lg "
          >
            <img src={item.photos[0]} alt="hotel image" className="w-full " />
          </Link>
          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-2xl font-roboto font-semibold">{item.name}</h1>
            <h2 className="font-serif text-sm font-semibold">{item.title}</h2>
            <p className="text-xs ">{item.description}</p>
            <div className="self-end flex gap-4">
              <Link to={`/admin/updateHotel/${item._id}`} className="btn">
                Update
              </Link>
              <Link to={`/admin/deleteHotel/${item._id}`} className="btn">
                Delete
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default List;
