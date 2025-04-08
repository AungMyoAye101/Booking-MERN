import Contact from "../components/Contact";
import Destination from "../components/Destination";
import Hero from "../components/Hero";
import ListByType from "../components/ListByType";
import Search from "../components/SearchBox";
import HotelList from "../components/HotelList";
import Offer from "../components/Offer";
import Footer from "../components/Footer";


const Home = () => {


  return (
    <section>
      <Hero />
      <div className="max-w-6xl m-auto w-full  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 ">
        <Search />
      </div>
      <div className="py-20 px-4 max-w-6xl m-auto ">
        <Destination />
        <ListByType />
        <Offer />
        <HotelList />
      </div>

      <Contact />
      <Footer />
    </section>
  );
};

export default Home;
