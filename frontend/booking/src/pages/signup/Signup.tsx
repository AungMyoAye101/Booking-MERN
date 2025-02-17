import { Link } from "react-router-dom";
import "../login/login.css";
import { useState } from "react";
const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    console.log(user);
  };
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
      setError(false);
    }
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
        <button
          onClick={(e) => onSubmitHandle(e)}
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          Submit
        </button>
        {error && <p className="error-message">Username does't match</p>}
      </form>
    </section>
  );
};

export default Signup;
