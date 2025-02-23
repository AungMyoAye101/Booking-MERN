import { Link, useNavigate } from "react-router-dom";
import "../login/login.css";
import { useState } from "react";
import { signUpUserValidation } from "../../lib/formValidation";
const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState(false);
  const [errorMesasage, setErrorMesage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    console.log(user);
    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const onSubmitHandle = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validatedUser = signUpUserValidation.parse(user);
      if (validatedUser) {
        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const data = await res.json();
        console.log(data);
        navigate("/");
      }
    } catch (error: any) {
      setError(true);
      setErrorMesage(error.errors[0].message);
      console.log(error);
    } finally {
      setLoading(false);
    }
    setUser({ name: "", password: "", email: "" });
  };

  return (
    <section className="container">
      <form className="form-container">
        <h1>Signup </h1>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="name"
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
        {error && <p className="error-message">{errorMesasage}</p>}
      </form>
    </section>
  );
};

export default Signup;
