import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginUserValidation } from "../lib/formValidation";
import { useAuth } from "../context/authContext";

// const Login = () => {
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(false);
//   const [errorMessage, setErrorMEssage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { dispatch } = useAuth()
//   const navigate = useNavigate();


//   const handleChange = (e: { target: { name: string; value: string } }) => {
//     setUser((pre) => ({ ...pre, [e.target.name]: e.target.value }));
//   };
//   const onSubmitHandle = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const validatedUser = loginUserValidation.parse(user);
//       if (validatedUser) {

//         const res = await fetch("http://localhost:5000/api/auth/login", {
//           method: "POST",
//           headers: { "Content-type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(user),
//         });
//         if (!res.ok) {
//           throw new Error("Something went wrong");
//         }
//         const data = await res.json();
//         dispatch({ type: "LOGIN", payload: data });
//         console.log(data);
//         navigate("/");
//       } else {
//         throw new Error();
//       }
//     } catch (error: any) {
//       setError(true);
//       setErrorMEssage(error.message);
//       dispatch({ type: "LOGIN_FAILED", payload: error });
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//     setUser({ email: "", password: "" });
//   };

//   return (
//     <section className="flex justify-center items-center min-h-screen relative">
//       <form className="bg-white min-w-80 max-w-96 h-fit py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
//         <h1 className="text-center font-bold font-roboto text-2xl">Login </h1>
//         <label htmlFor="email" className="flex flex-col gap-1">
//           <span className="font-roboto text-sm"> Email</span>

//           <input
//             value={user.email}
//             id="email"
//             type="email"
//             name="email"
//             placeholder="example@gmail.com"
//             onChange={(e) => handleChange(e)}
//             className="bg-neutral-100 rounded p-2 border"
//           />
//         </label>
//         <label htmlFor="password" className="flex flex-col gap-1">
//           <span className="font-roboto text-sm">Password</span>
//           <input
//             value={user.password}
//             type="password"
//             name="password"
//             placeholder="password"
//             onChange={(e) => handleChange(e)}
//             className="bg-neutral-100 rounded p-2 border"
//           />
//         </label>
//         <div className="flex justify-between items-center ">
//           <p className="text-xs font-roboto opacity-80 ">
//             Don't have an account?
//           </p>
//           <Link
//             to={"/signup"}
//             className="font-roboto font-semibold text-xs hover:text-blue-700"
//           >
//             Signup
//           </Link>
//         </div>
//         <button
//           onClick={onSubmitHandle}
//           disabled={loading}
//           style={{ cursor: loading ? "not-allowed" : "pointer" }}
//           className="bg-blue-800  p-2 rounded-lg font-roboto  text-white hover:bg-blue-500"
//         >
//           Submit
//         </button>
//         {error && (
//           <p className="bg-rose-500 text-white rounded-lg p-2">
//             {errorMessage}
//           </p>
//         )}
//       </form>
//     </section>
//   );
// };

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((pre) => ({ ...pre, [name]: value }))
  }

  const onSubmitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (!res.ok) {
        console.log("failed to login")
        throw new Error("Login failed")
      }
      setLoading(false)
      console.log("Login success.")
      navigate("/")
    } catch (error: any) {
      console.log(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="flex justify-center items-center min-h-screen relative">
      <form onSubmit={onSubmitHandle} className="bg-white min-w-80 max-w-96 h-fit py-8 px-6 border  rounded-lg shadow-lg flex flex-col gap-4 ">
        <h1 className="text-center font-bold font-roboto text-2xl">Login </h1>
        <label htmlFor="email" className="flex flex-col gap-1">
          <span className="font-roboto text-sm"> Email</span>

          <input
            value={user.email}
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={(e) => handleChange(e)}
            className="bg-neutral-100 rounded p-2 border"
          />
        </label>
        <label htmlFor="password" className="flex flex-col gap-1">
          <span className="font-roboto text-sm">Password</span>
          <input
            value={user.password}
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => handleChange(e)}
            className="bg-neutral-100 rounded p-2 border"
          />
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
          type="submit"
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
          className="bg-blue-800  p-2 rounded-lg font-roboto  text-white hover:bg-blue-500"
        >
          Submit
        </button>
        {/* {error && (
          <p className="bg-rose-500 text-white rounded-lg p-2">
            {errorMessage}
          </p>
        )} */}
      </form>
    </section>
  )
}

export default Login;
