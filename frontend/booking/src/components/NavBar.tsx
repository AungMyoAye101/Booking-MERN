import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";


const NavBar = () => {

  const { user, dispatch } = useAuth()
  console.log(user, 'checked')
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
      console.log("Logout success");
    } catch (error) {
      console.log(error);

    }
  };
  return (
    <nav className="bg-blue-800 fixed top-0 left-0 w-full  z-50">
      <div className="flex justify-between items-center max-w-6xl px-4 py-2 m-auto">
        <Link to="/">
          <h1 className="text-3xl font-bold uppercase text-white font-roboto">
            Booking
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {user._id ? (
            <>

              <Link to={"/admin"} className="btn bg-white text-blue-800 hover:bg-blue-200">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="btn bg-white text-blue-800 hover:bg-blue-200"
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
