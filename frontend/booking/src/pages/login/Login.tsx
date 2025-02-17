import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
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
    setUser({ username: "", password: "" });
  };
  return (
    <section className="container">
      <form className="form-container">
        <h1>Login </h1>
        <input
          value={user.username}
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          value={user.password}
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => handleChange(e)}
        />
        <div className="link-con">
          <p>Don't have an account?</p>
          <Link to={"/signup"}>Signup</Link>
        </div>
        <button
          onClick={onSubmitHandle}
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

export default Login;
