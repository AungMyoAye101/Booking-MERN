import { Link, Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const location = useLocation()
  const pathname = location.pathname
  return (
    <section className=" gap-4 max-w-6xl mx-auto  px-4  ">
      <div className=" sticky top-12 py-4 z-40 bg-neutral-50 px-4">
        <div className="flex border rounded-lg overflow-hidden w-fit">

          <Link to={"/admin"}
            className={`p-2 px-4 font-roboto text-sm md:text-base hover:bg-purple-100 hover:text-black ${pathname === "/admin" ? "bg-blue-400 text-white" : 'bg-white'}`}
          >Dashboard</Link>
          <Link to={"/admin/hotels?page=1&limit=4"}
            className={`p-2 px-4 font-roboto text-sm md:text-base hover:bg-purple-100 hover:text-black ${pathname === "/admin/hotels" ? "bg-blue-400 text-white" : 'bg-white'}`}
          >Hotels</Link>
          <Link to={"/admin/createHotel"}
            className={`p-2 px-4 font-roboto text-sm md:text-base hover:bg-purple-100 hover:text-black ${pathname === "/admin/createHotel" ? "bg-blue-400 text-white" : 'bg-white'}`}
          >Create hotel</Link>
        </div>
      </div>
      <div className="p-4">
        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
