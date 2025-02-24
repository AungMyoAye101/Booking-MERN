import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="py-10 max-w-6xl  m-auto flex justify-center items-center ">
      <div className=" w-full  border border-gray-100 shadow-lg flex justify-between  gap-4 text-white relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-yellow-300 absolute -left-4 top-10 "></div>
        <div className="w-20 h-20 rounded-full bg-yellow-300 absolute right-96 -bottom-10 "></div>
        <div className="  flex justify-center w-full overflow-hidden">
          <div className="w-[50%] scale-150 rounded-full bg-blue-600  flex justify-center items-center flex-col gap-1">
            <h1 className="font-roboto text-2xl font-semibold text-left">
              Save time, save money!
            </h1>
            <p className="text-sm text-left">
              Sign up and we'll send the best deals to you
            </p>

            <Link
              to={"/signup"}
              className="bg-blue-300 font-roboto  text-black text-xs px-4 py-2 rounded-md"
            >
              Signup
            </Link>
          </div>
        </div>
        <img
          src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-1850.jpg?t=st=1740412639~exp=1740416239~hmac=19e15cf593ca784c3fffc9a21f78d834893a2c6672e164763def9a10bb283cce&w=740"
          alt="contact girl"
          className="w-96 h-auto aspect-square"
        />
      </div>
    </section>
  );
};

export default Contact;
