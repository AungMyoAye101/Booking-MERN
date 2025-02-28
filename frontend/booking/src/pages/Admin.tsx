import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div>
        <Link to={"/admin/createHotel"} className="btn">
          Create hotel
        </Link>
      </div>
    </section>
  );
};

export default Admin;
