import { Link, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <section className="flex py-16 gap-4 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 bg-white p-4 border rounded w-60">
        <Link to={"/admin"}>Dashboard</Link>
        <Link to={"/admin/hotels"}>Hotels</Link>
        <Link to={"/admin/createHotel"}>Create hotel</Link>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
