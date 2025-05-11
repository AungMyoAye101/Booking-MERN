import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { signUpUserValidation } from "../lib/formValidation";

import { CreateUserType } from "../lib/types";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAuth } from "../context/authContext";
const Signup = () => {
  const [user, setUser] = useState<CreateUserType>({
    name: "",
    password: "",
    email: "",
  });

  const [password, setPassword] = useState<boolean>(true)
  const { dispatch } = useAuth()

  const navigate = useNavigate();
  const handleChange = (e: { target: { name: string; value: string } }) => {

    setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const onSubmitHandle = async (e: FormEvent) => {
    e.preventDefault();

    const validatedUser = signUpUserValidation.parse(user);
    if (validatedUser) {
      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        });
        const data = await res.json();
        if (!res.ok || data.success === false) {
          console.log(data.message)
          return
        }

        dispatch({ type: "LOGIN", payload: data.user });
        navigate("/");

      } catch (error) {
        console.log(error)
      }


    }

    setUser({ name: "", password: "", email: "" });
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <form onSubmit={onSubmitHandle} className="bg-white min-w-80 max-w-96 h-fit py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
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
        <label htmlFor="password" className="flex flex-col gap-1 relative">
          <span className="font-roboto text-sm">Password</span>
          <input
            type={password ? "password" : "text"}
            name="password"
            id="password"
            value={user.password}
            placeholder="password"
            onChange={(e) => handleChange(e)}
            className="bg-neutral-100 rounded p-2 border "
          />
          {
            password ? <FaEyeSlash className="absolute right-2 top-[60%] z-10 cursor-pointer" onClick={() => setPassword(false)} /> : <FaEye className="absolute right-2 top-[60%] z-10 cursor-pointer" onClick={() => setPassword(true)} />
          }

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
          type="submit"
          className="bg-blue-800  p-2 rounded-lg font-roboto  text-white hover:bg-blue-500"
        >
          Submit
        </button>

      </form>
    </section>
  );
};

export default Signup;
