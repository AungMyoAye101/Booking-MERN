import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useContext, useState } from "react";
import { loginUserValidation } from "../lib/formValidation";
import { authContext } from "../context/authContext";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMEssage] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const onSubmitHandle = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validatedUser = loginUserValidation.parse(user);
      if (validatedUser) {
        dispatch({ type: "LOGIN_START" });
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(user),
        });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigate("/");
        console.log(data);
      } else {
        throw new Error();
      }
    } catch (error: any) {
      setError(true);
      setErrorMEssage(error.message);
      dispatch({ type: "LOGIN_FAILED", payload: error });
      console.log(error);
    } finally {
      setLoading(false);
    }
    setUser({ email: "", password: "" });
  };

  return (
    <section className="container">
      <form className="form-container">
        <h1>Login </h1>
        <input
          value={user.email}
          type="email"
          name="email"
          placeholder="email"
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
