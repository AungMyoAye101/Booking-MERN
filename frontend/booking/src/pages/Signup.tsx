import { Link, useNavigate } from "react-router-dom";
import { CreateUserType } from "../lib/types";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { base_url } from "../lib/helper";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
const Signup = () => {

  const { dispatch } = useAuth()
  const navigate = useNavigate();



  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateUserType>()

  const onSubmitHandle = handleSubmit(async (data) => {
    console.log("click")
    try {
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
        return
      }

      dispatch({ type: "LOGIN", payload: resData.user });
      navigate("/");

    } catch (error) {
      console.log(error)
    }

  })




  return (
    <section className="flex justify-center items-center min-h-screen">
      <form onSubmit={onSubmitHandle} className="bg-white min-w-80 max-w-96 h-fit py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
        <h1 className="text-center font-bold font-roboto text-2xl">Signup </h1>

        <label htmlFor="name" className="flex flex-col gap-1">
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
        <label htmlFor="email" className="flex flex-col gap-1">
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
        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Password</span>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required.", minLength: { value: 6, message: "Password at least 6 characters long." } })}
            placeholder="your password"
            className="input_con"
          />
          {
            errors.password && <p className="error_message">{errors.password.message}</p>
          }
        </label>


        <label htmlFor="comfirm-password" className="flex flex-col gap-1">
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
