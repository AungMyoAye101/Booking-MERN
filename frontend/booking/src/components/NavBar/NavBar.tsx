import { Link } from "react-router-dom";
import "../../global.css";
import "./navbar.css";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

const NavBar = () => {
  const { user } = useContext(authContext);
  console.log("user" + user.name);
  return (
    <nav className="nav_container">
      <Link to="/">
        <h1 className="logo_title">Booking</h1>
      </Link>
      {user && <div>{user.name}</div>}

      <div className="link_container">
        <Link to={"/login"} className="link_btn">
          Login
        </Link>
        <Link to={"/signup"} className="link_btn">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
