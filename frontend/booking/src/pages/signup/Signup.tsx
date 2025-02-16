import { Link } from "react-router-dom";
import "./signup.css";
const Signup = () => {
  return (
    <section className="container">
      <form className="form-container">
        <h1>Signup </h1>
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <input type="email" placeholder="example@.gmail.com" />
        <div className="link-con">
          <p>Already have an account?</p>
          <Link to={"/login"}>Login</Link>
        </div>
        <button>Submit</button>
      </form>
    </section>
  );
};

export default Signup;
