import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <section className="flex mt-16 gap-4 max-w-6xl mx-auto h-[calc(100vh-60px)] ">
      <div className="flex flex-col gap-4 bg-white p-4 border rounded w-60">
        <Link to={"/admin"}>Dashboard</Link>
        <Link to={"/admin/hotels"}>Hotels</Link>
        <Link to={"/admin/createHotel"}>Create hotel</Link>
      </div>
      <div className="flex-1 overflow-hidden overflow-y-scroll">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
