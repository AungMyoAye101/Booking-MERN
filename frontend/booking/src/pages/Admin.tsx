import { Link, Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation()
  const pathname = location.pathname
  return (
    <section className=" gap-4 max-w-6xl mx-auto  px-4 relative ">
      <div className=" sticky top-14 p-4 bg-neutral-50 ">
        <div className="flex border rounded-lg overflow-hidden w-fit">

          <Link to={"/admin"}
            className={`p-2 px-4 font-roboto hover:bg-purple-100 hover:text-black ${pathname === "/admin" ? "bg-blue-400 text-white" : 'bg-white'}`}
          >Dashboard</Link>
          <Link to={"/admin/hotels?page=1&limit=4"}
            className={`p-2 px-4 font-roboto hover:bg-purple-100 hover:text-black ${pathname === "/admin/hotels" ? "bg-blue-400 text-white" : 'bg-white'}`}
          >Hotels</Link>
          <Link to={"/admin/createHotel"}
            className={`p-2 px-4 font-roboto hover:bg-purple-100 hover:text-black ${pathname === "/admin/createHotel" ? "bg-blue-400 text-white" : 'bg-white'}`}
          >Create hotel</Link>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
