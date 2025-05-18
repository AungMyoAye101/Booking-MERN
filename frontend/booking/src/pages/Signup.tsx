import { Link, useNavigate } from "react-router-dom";
import { CreateUserType } from "../lib/types";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { base_url } from "../lib/helper";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import { showToast } from "../context/ToastProvider";
import { useState } from "react";
const Signup = () => {

  const { dispatch } = useAuth()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateUserType>()

  const onSubmitHandle = handleSubmit(async (data) => {
    try {
      setLoading(true)
      const res = await fetch(base_url + "/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: "include"

      })
      const resData = await res.json()

      if (!res.ok && resData.success === false) {
        console.log(resData.message)
        showToast("error", resData.message)
        return
      }
      showToast("success", resData.message)
      dispatch({ type: "LOGIN", payload: resData.user });
      navigate("/");

    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
        showToast("error", error.message)
      }
    } finally {
      setLoading(false)
    }

  })




  return (
    <section className="flex justify-center items-center min-h-screen mt-10">
      <form onSubmit={onSubmitHandle} className="bg-white  min-w-80 max-w-[400px] flex-1 py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
        <h1 className="text-center font-bold font-roboto text-2xl">Signup </h1>
        <main className="flex flex-wrap gap-4">

          <label htmlFor="name" className="input_container">
            <span className="font-roboto text-sm">Name</span>
            <input
              type="text"
              id="name"
              {...register("name", { required: "This field is required.", minLength: { value: 1, message: "Name at least 1 character." } })}
              placeholder="Jhon Doe"
              className="input_con"
            />
            {
              errors.name && <p className="error_message">{errors.name.message}</p>
            }
          </label>
          <label htmlFor="email" className="input_container">
            <span className="font-roboto text-sm">Email</span>
            <input
              type="email"
              id="email"
              {...register("email", { required: "This field is required." })}
              placeholder="example@gamil.com"
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


          <label htmlFor="comfirm-password" className="input_container">
            <span className="font-roboto text-sm">Comfirm Password</span>
            <input
              type="password"
              id="comfirm-password"
              {...register("comfrimPassword", {
                validate: (val) => {
                  if (!val) {
                    return "Comfrim password is required"
                  } else if (val !== watch("password")) {
                    return "Passwords do not match."
                  }
                }
              })}

              placeholder="comfirm password"
              className="input_con"
            />
            {
              errors.comfrimPassword && <p className="error_message">{errors.comfrimPassword.message}</p>
            }
          </label>
        </main>
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-800  px-4 py-1.5 rounded-lg font-roboto  text-white hover:bg-blue-500  ${loading ? 'cursor-wait' : "cursor-pointer"}`}
        >
          {loading ? "Submiting..." : "Submit"}
        </button>
        <Link to={'/login'} className="font-roboto text-sm hover:text-purple-500">Already have an account? Login</Link>
      </form>
    </section>
  );
};

export default Signup;
