import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginUserType } from "../lib/types";
import { showToast } from "../context/ToastProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { base_url } from "../lib/helper";



const Login = () => {

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth()
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginUserType>()

  const onSubmitHandle = handleSubmit(async (data) => {

    setLoading(true);
    try {
      const res = await fetch(base_url + "/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok && resData.success === false) {
        setError(resData.message)
        showToast("error", resData.message)
        return
      }

      dispatch({ type: "LOGIN", payload: resData.data });
      showToast("success", resData.message)
      navigate("/");

    } catch (error) {
      if (error instanceof Error) setError(error.message)
    } finally {
      setLoading(false);
    }

  });

  return (
    <section className="flex justify-center items-center min-h-screen relative bg-gradient-to-b from-blue-50 to-blue-300 px-4">
      <form className="bg-white min-w-[300px] max-w-[400px] flex-1 h-fit py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
        <h1 className="text-center font-bold font-roboto text-2xl">Login </h1>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Email</span>
          <input
            type="email"
            id="email"
            {...register("email", { required: "This field is required." })}
            placeholder="example@gmail.com"
            className="input_con"
          />
          {
            errors.email && <p className="error_message">{errors.email.message}</p>
          }
        </label>
        <label htmlFor="password" className="input_container relative">
          <span className="font-roboto text-sm">Password</span>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            {...register("password", { required: "Password is required.", minLength: { value: 6, message: "Password at least 6 characters long." } })}
            placeholder="your password"
            className="input_con "
          />
          <button className="absolute right-2 top-[55%] text-neutral-600 text-lg" type="button" onClick={() => setShowPassword(pre => !pre)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
          {
            errors.password && <p className="error_message">{errors.password.message}</p>
          }
        </label>

        <div className="flex justify-between items-center ">
          <p className="text-xs font-roboto opacity-80 ">
            Don't have an account?
          </p>
          <Link
            to={"/signup"}
            className="font-roboto font-semibold text-xs hover:text-blue-700"
          >
            Signup
          </Link>
        </div>
        <button
          onClick={onSubmitHandle}
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          className="bg-blue-800  p-2 rounded-lg font-roboto  text-white hover:bg-blue-500"
        >
          Submit
        </button>
        {error && (
          <p className="bg-rose-500 text-white rounded-lg p-2">
            {error}
          </p>
        )}
      </form>
    </section>
  );
};



export default Login;
