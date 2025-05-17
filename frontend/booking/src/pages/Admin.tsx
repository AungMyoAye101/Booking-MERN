import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <section className="flex flex-col mt-16 gap-4 max-w-6xl mx-auto h-[calc(100vh-60px)] px-4 ">
      <div className="flex gap-4 ">
        <Link to={"/admin"} className="text-neutral-600 font-roboto hover:text-purple-500 cursor-pointer">Dashboard</Link>
        <Link to={"/admin/hotels"} className="text-neutral-600 font-roboto hover:text-purple-500 cursor-pointer">Hotels</Link>
        <Link to={"/admin/createHotel"} className="text-neutral-600 font-roboto hover:text-purple-500 cursor-pointer">Create hotel</Link>
      </div>
      <div className=" overflow-hidden overflow-y-scroll">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
