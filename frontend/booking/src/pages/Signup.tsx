import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpUserValidation } from "../lib/formValidation";
import { register } from "../lib/auth.action";
import { CreateUserType } from "../lib/types";
const Signup = () => {
  const [user, setUser] = useState<CreateUserType>({
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
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validatedUser = signUpUserValidation.parse(user);
      if (validatedUser) {
        const data = register(user);
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
    <section className="flex justify-center items-center min-h-screen">
      <form className="bg-white min-w-80 max-w-96 h-fit py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
        <h1 className="text-center font-bold font-roboto text-2xl">Signup </h1>

        <label htmlFor="name" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Name</span>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            placeholder="name"
            onChange={(e) => handleChange(e)}
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>

        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Password</span>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            placeholder="password"
            onChange={(e) => handleChange(e)}
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            placeholder="example@.gmail.com"
            onChange={(e) => handleChange(e)}
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>
        <div className="flex justify-between items-center">
          <p className="text-xs font-roboto opacity-80 ">
            Already have an account?
          </p>
          <Link
            to={"/login"}
            className="font-roboto font-semibold text-xs hover:text-blue-700"
          >
            Login
          </Link>
        </div>
        <button
          onClick={(e) => onSubmitHandle(e)}
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          className="bg-blue-800  p-2 rounded-lg font-roboto  text-white hover:bg-blue-500"
        >
          Submit
        </button>
        {error && (
          <p className="bg-rose-500 text-white rounded-lg p-2">
            {errorMesasage}
          </p>
        )}
      </form>
    </section>
  );
};

export default Signup;
