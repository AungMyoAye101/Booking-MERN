const CreateHotel = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Get form data

    // Access form values
    const name = formData.get("name");
    const title = formData.get("title");
    const description = formData.get("description");
    const photo = formData.get("photo");
    const city = formData.get("city");

    console.log({ name, title, description, photo, city });
  };

  return (
    <section className="py-20 flex justify-center">
      <form
        onSubmit={handleSubmit} // Use onSubmit instead of action
        className="grid grid-cols-2 w-full gap-4 bg-white rounded-lg p-4 border"
      >
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

        <label htmlFor="photo" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Photo</span>
          <input
            id="photo"
            type="text"
            name="photo"
            placeholder="photo URL"
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

        <button type="submit" className="btn h-fit">
          Create Hotel
        </button>
      </form>
    </section>
  );
};

export default CreateHotel;
