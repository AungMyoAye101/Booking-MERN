import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="py-10 max-w-6xl  m-auto flex justify-center items-center ">
      <div className=" w-full  border bg-white border-gray-100 rounded-lg shadow-lg flex justify-between  gap-4 text-white relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-yellow-300 absolute -left-4 top-10 "></div>
        <div className="w-20 h-20 rounded-full bg-yellow-300 absolute right-96 -bottom-10 "></div>
        <div className="  flex justify-center w-full overflow-hidden">
          <div className="w-[60%] md:w-[50%]  scale-125 md:scale-150 rounded-full font-roboto bg-blue-600  p-4 flex justify-center items-center flex-col gap-1 relative z-10">
            <h1 className="font-roboto text-lg md:text-2xl font-semibold text-left">
              Save time, save money!
            </h1>
            <p className="text-xs md:text-sm text-left">
              Sign up and we'll send the best deals to you
            </p>

            <Link
              to={"/signup"}
              className="bg-white text-black  text-xs px-3 py-1 rounded hover:bg-blue-200"
            >
              Signup
            </Link>
          </div>
        </div>
        <img
          src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-1850.jpg?t=st=1740412639~exp=1740416239~hmac=19e15cf593ca784c3fffc9a21f78d834893a2c6672e164763def9a10bb283cce&w=740"
          alt="contact girl"
          className="w-44 sm:w-56 md:w-96 h-auto aspect-square"
        />
      </div>
    </section>
  );
};

export default Contact;
