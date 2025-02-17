import { Link } from "react-router-dom";
import "../login/login.css";
import { useState } from "react";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    console.log(user);
  };
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    console.log(user);
    setUser({ username: "", password: "", email: "" });
  };

  return (
    <section className="container">
      <form className="form-container">
        <h1>Signup </h1>
        <input
          type="text"
          name="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="email"
          name="email"
          value={user.email}
          placeholder="example@.gmail.com"
          onChange={(e) => handleChange(e)}
        />
        <div className="link-con">
          <p>Already have an account?</p>
          <Link to={"/login"}>Login</Link>
        </div>
        <button onClick={(e) => onSubmitHandle(e)}>Submit</button>
      </form>
    </section>
  );
};

export default Signup;
