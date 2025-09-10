
import Destination from "../components/Destination";
import Hero from "../components/Hero";
import ListByType from "../components/ListByType";
import HotelList from "../components/HotelList";
import Offer from "../components/Offer";
import Test from "../components/Test";



const Home = () => {


  return (
    <section>
      <Hero />
      <div className="py-20 px-4 max-w-6xl m-auto ">
        <Destination />
        <ListByType />
        <Offer />
        {/* <HotelList /> */}
        <Test />
      </div>


    </section>
  );
};

export default Home;
