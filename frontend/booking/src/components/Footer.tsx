import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    "home",
    'about',
    'contact',
  ];
  return (
    <section className="flex justify-center items-start p-4 bg-blue-300">
      <div className="flex flex-col gap-2  items-center justify-center">
        <h1 className="text-xl md:text-2xl font-semibold font-roboto ">Booking</h1>
        <div className="flex justify-center items-center gap-4 ">
          {
            links.map(i => (
              <Link to={i} key={i} className="font-serif text-lg md:text-xl">{i}</Link>
            ))
          }
        </div>
        <div className="flex justify-center items-center gap-4 ">
          <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-400 text-black hover:text-white">
            <FaFacebookF />
          </a>
          <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-400 text-black hover:text-white">
            <FaXTwitter />
          </a>
          <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-400 text-black hover:text-white">
            <FaInstagram />
          </a>
          <a href={'/'} className="flex justify-center items-center w-10 h-10 rounded-full bg-white hover:bg-blue-400 text-black hover:text-white">
            <FaWhatsapp />
          </a>






        </div>
      </div>
    </section>
  );
};

export default Footer;
