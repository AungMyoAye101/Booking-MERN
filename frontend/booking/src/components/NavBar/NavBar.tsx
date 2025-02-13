import { Link } from "react-router-dom";
import "../../global.css";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="nav_container">
      <Link to="/">
        <h1>Booking</h1>
      </Link>
      <div className="flex-center">
        <Link to={"/hotel"}>Hotel</Link>
        <Link to={"/list"}>List</Link>
      </div>
    </nav>
  );
};

export default NavBar;
