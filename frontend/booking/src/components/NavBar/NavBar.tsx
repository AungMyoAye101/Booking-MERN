import { Link } from "react-router-dom";
import "../../global.css";
import "./navbar.css";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

const NavBar = () => {
  const { user, dispatch } = useContext(authContext);
  console.log("user" + user);

  const handleLogout = async () => {
    try {
      await fetch(`http://localhost:5000/api/auth/logout`);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILED", payload: error });
    }
  };
  return (
    <nav className="nav_container">
      <Link to="/">
        <h1 className="logo_title">Booking</h1>
      </Link>
      <div className="link_container">
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to={"/login"} className="link_btn">
              Login
            </Link>
            <Link to={"/signup"} className="link_btn">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
