import Contact from "../components/Contact";
import Destination from "../components/Destination";
import Hero from "../components/Hero";
import ListByType from "../components/ListByType";
import HotelList from "../components/HotelList";
import Offer from "../components/Offer";



const Home = () => {


  return (
    <section>
      <Hero />
      <div className="py-20 px-4 max-w-6xl m-auto ">
        <Destination />
        <ListByType />
        <Offer />
        <HotelList />
        <Contact />
      </div>


    </section>
  );
};

export default Home;
