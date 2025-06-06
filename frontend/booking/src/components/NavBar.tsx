import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import MobileMenubar from "./MobileMenubar";


const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false)
  const { user, dispatch } = useAuth()
  const location = useLocation()
  const isHome = location.pathname === ('/')
  const navBg = isHome ? isScroll ? "bg-blue-400" : "bg-transprent" : "bg-blue-400"
  useEffect(() => {
    const handleScroll = () => {
      const offest = window.scrollY;
      setIsScroll(offest > 100)
    }
    window.addEventListener("scroll", handleScroll)


    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  const handleLogout = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Logout failed");
      }
      dispatch({ type: "LOGOUT" });
    } catch (error) {

      if (error instanceof Error) console.log(error.message)
    }
  };
  return (
    <nav className={`fixed top-0 left-0 w-full  z-50 transition-all duration-500 ease-in-out  ${navBg}`}>
      <div className="flex justify-between items-center max-w-6xl px-4 py-2 m-auto relative">
        <Link to="/">
          <h1 className="text-3xl font-bold uppercase text-white font-roboto">
            Booking
          </h1>
        </Link>
        <div className="block md:hidden">
          <MobileMenubar userId={user._id} handleLogout={handleLogout} />
        </div>
        <div className="hidden md:flex items-center gap-4">
          {user._id ? (
            <>

              <Link to={`/mybooking/${user._id}`} className="btn bg-white text-gray-600 hover:bg-blue-200">
                My Booking
              </Link>
              <Link to={"/admin"} className="btn bg-white text-gray-600 hover:bg-blue-200">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="btn bg-white text-red-400 hover:bg-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="btn bg-white text-blue-800 hover:bg-blue-200">
                Login
              </Link>
              <Link to={"/signup"} className="btn bg-white text-blue-800 hover:bg-blue-200">
                Signup
              </Link>
            </>
          )}


        </div>
      </div>
    </nav>
  );
};

export default NavBar;
