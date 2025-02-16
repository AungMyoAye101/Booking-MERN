import { Link } from "react-router-dom";
import "./login.css";
const Login = () => {
  return (
    <section className="container">
      <form className="form-container">
        <h1>Login </h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <div className="link-con">
          <p>Don't have an account?</p>
          <Link to={"/signup"}>signup</Link>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default Login;
