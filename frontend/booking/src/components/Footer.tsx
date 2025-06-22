import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const links = [
  "Home",
  'About',
  'Contact us',
];
const Footer = () => {
  return (
    <section className=" bg-sky-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 justify-between  px-4 py-12">
        <Link to={'/'} className=" text-2xl md:text-4xl font-bold font-roboto ">Booking.com</Link>
        <div className="flex flex-col gap-2">
          {
            links.map(i => (
              <Link to={i} key={i} className="font-roboto font-medium hover:text-purple-500 text-gray-800  text-lg md:text-xl">{i}</Link>
            ))
          }
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="newsletter">

              Newsletter
            </label>
            <input type="text" id="newsletter" className="rounded-md  px-2 py-1.5" />
          </div>

          <div className="flex  justify-center items-center gap-4 ">
            <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-500 text-black hover:text-white">
              <FaFacebookF />
            </a>
            <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-500 text-black hover:text-white">
              <FaXTwitter />
            </a>
            <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-500 text-black hover:text-white">
              <FaInstagram />
            </a>
            <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-500 text-black hover:text-white">
              <FaWhatsapp />
            </a>






          </div>
        </div>
      </div>



    </section>
  );
};

export default Footer;
