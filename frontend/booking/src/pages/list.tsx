import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

const List = () => {
  const { data, loading, reFetch } = useFetch("api/hotel?limit=10");
  const [toggleDelete, setToggleDelete] = useState(false)
  const [selection, setSelection] = useState({
    _id: "",
    name: "",
    type: "",
  })


  useEffect(() => {
    if (toggleDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleDelete]);

  const handleOpen = (_id: string, name: string, type: string) => {
    setToggleDelete(!toggleDelete);
    setSelection({
      _id,
      name,
      type
    })//toggle the delete modal
  };



  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/hotel/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw Error("Failed to delete hotel");
      }
      setToggleDelete(false);
      reFetch()
      console.log("hotel was deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full flex flex-col gap-6 ">

      {
        loading ? <div>Loading...</div> :

          data.map((item) => (
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
              <div className="flex flex-col gap-2 flex-1">
                <h1 className="text-2xl font-roboto font-semibold">{item.name}</h1>
                <h2 className="font-roboto text-sm font-semibold">{item.title} </h2>
                <p className="text-xs ">{item.description}</p>
                <div className="self-end flex gap-4">
                  <Link to={`/admin/updateHotel/${item._id}`} className="btn">
                    Update
                  </Link>
                  <button onClick={() => handleOpen(item._id, item.name, item.type)} className="btn bg-rose-600">
                    Delete
                  </button>
                </div>
              </div>

              {
                toggleDelete && (<div className="absolute z-50 inset-0 flex justify-center items-center bg-black bg-opacity-10">
                  <div className="flex flex-col  gap-4 p-4 rounded-xl shadow-lg w-96 bg-white">
                    <h2 className="font-roboto text-center text-xl ">
                      Are you sure,you want to delete this <i className="font-semibold">{selection.name}
                      </i> {selection.type}.
                    </h2>
                    <div className="flex items-center gap-4 self-end">
                      <button className="btn bg-neutral-400"
                        onClick={() => setToggleDelete(false)}
                      >Cencel</button>
                      <button className="btn bg-red-600"
                        onClick={() => handleDelete(selection._id)}
                      >Delete</button>
                    </div>
                  </div>
                </div>)
              }

            </div>
          ))

      }


    </section>
  );
};

export default List;
