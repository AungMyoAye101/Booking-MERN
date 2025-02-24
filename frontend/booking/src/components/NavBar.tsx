import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/authContext";

const NavBar = () => {
  const { user, dispatch } = useContext(authContext);

  const handleLogout = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/logout`, {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Logout failed");
      }

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILED", payload: error });
    }
  };
  return (
    <nav className="bg-white fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="flex justify-between items-center max-w-6xl px-4 py-2 m-auto">
        <Link to="/">
          <h1 className="text-3xl font-bold uppercase text-blue-800 font-roboto">
            Booking
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to={"/login"} className="btn">
                Login
              </Link>
              <Link to={"/signup"} className="btn">
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
