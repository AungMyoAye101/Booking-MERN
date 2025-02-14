import { Link } from "react-router-dom";
import "../../global.css";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="nav_container">
      <Link to="/">
        <h1 className="logo_title">Booking</h1>
      </Link>
      <div className="link_container">
        <Link to={"/login"} className="link_btn">
          Login
        </Link>
        <Link to={"/register"} className="link_btn">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
