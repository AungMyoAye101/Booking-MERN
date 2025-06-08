import { Link, Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation()
  const pathname = location.pathname
  console.log(location)
  return (
    <section className="flex flex-col mt-16 gap-4 max-w-6xl mx-auto h-[calc(100vh-60px)] px-4 ">
      <div className="flex gap-2 ">
        <Link to={"/admin"}
          className={`link_text ${pathname === "/admin" ? "bg-blue-400" : ''}`}
        >Dashboard</Link>
        <Link to={"/admin/hotels"}
          className={`link_text ${pathname === "/admin/hotels" ? "bg-blue-400" : ''}`}
        >Hotels</Link>
        <Link to={"/admin/createHotel"}
          className={`link_text ${pathname === "/admin/createHotel" ? "bg-blue-400" : ''}`}
        >Create hotel</Link>
      </div>
      <div className=" overflow-hidden overflow-y-scroll">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
