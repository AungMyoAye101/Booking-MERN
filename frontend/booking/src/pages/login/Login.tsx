import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { z } from "zod";

const userValidation = z.object({
  username: z
    .string()
    .min(3, { message: "username contain at least 6 character" })
    .max(12, { message: "username doesn't exceed 12 character" }),
  password: z
    .string()
    .min(6, { message: "password contain at least 6 character" })
    .max(12, { message: "password doesn't exceed 12 character" }),
});
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMEssage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      userValidation.parse(user);
      console.log(user);
    } catch (error: any) {
      setError(true);
      setErrorMEssage(error.errors[0].message);
      console.log(error);
    } finally {
      setLoading(false);
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
        {error && <p className="error-message">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default Login;
