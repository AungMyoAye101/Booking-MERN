import { useState } from "react";
import { FaX } from "react-icons/fa6";

const CreateHotel = () => {
  const [hotel, setHotel] = useState({
    name: "",
    title: "",
    description: "",
    photos: [],
    address: "",
    cheapestPrice: 0,
    city: "",
    distance: [],
    featured: false,
    type: "",
  });
  const [photoArray, setPhotoArray] = useState<string[]>([]);
  const [url, setUrl] = useState("");

  // const handleChange = (e) => {
  //   setHotel((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  // };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setPhotoArray((pre) => [...pre, url]);
      setUrl("");
    }
  };
  console.log(photoArray);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget); // Get form data

    // // Access form values
    // const name = formData.get("name");
    // const title = formData.get("title");
    // const description = formData.get("description");
    // const photo = formData.get("photo");
    // const city = formData.get("city");

    // console.log({ name, title, description, photo, city });
  };

  return (
    <section className="py-20 flex justify-center">
      <form className="grid grid-cols-2 w-full gap-4 bg-white rounded-lg p-4 border">
        <label htmlFor="name" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Name</span>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="hotel name"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>

        <label htmlFor="title" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Title</span>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="title"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>

        <label htmlFor="description" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Description</span>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="description"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>
        <div>
          <label htmlFor="photo" className="flex flex-col gap-1">
            <span className="font-roboto text-sm">Photo</span>
            <input
              disabled={photoArray.length >= 5}
              id="photo"
              type="text"
              name="photo"
              value={url}
              placeholder="photo URL"
              className="bg-neutral-100 rounded p-2 border"
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </label>
          <div className="flex gap-2 items-center mt-2">
            {photoArray.length > 0 &&
              photoArray.map((n, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border border-gray-200 rounded-md w-32 gap-2 px-1.5 py-1 bg-blue-50  hover:bg-rose-100"
                >
                  <span className="text-xs line-clamp-1">{n}</span>
                  <FaX
                    onClick={() =>
                      setPhotoArray(() => photoArray.filter((_, y) => y !== i))
                    }
                    className=" text-xs cursor-pointer"
                  />
                  {/* <button
                    onClick={() =>
                      setPhotoArray(() => photoArray.filter((_, y) => y !== i))
                    }
                  >
                    <FaX className="text-lg " />
                  </button> */}
                </div>
              ))}
          </div>
        </div>
        <label htmlFor="distance" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">distance</span>
          <input
            id="distance"
            type="text"
            name="distance"
            placeholder="distance"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>

        <label htmlFor="city" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">City</span>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="city"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>
        <label htmlFor="address" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">address</span>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="address"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>
        <label htmlFor="price" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">price</span>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="0"
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>

        <button onClick={(e) => handleSubmit(e)} className="btn h-fit">
          Create Hotel
        </button>
      </form>
    </section>
  );
};

export default CreateHotel;
