import Contact from "../components/Contact";
import Destination from "../components/Destination";
import Hero from "../components/Hero";
import ListByType from "../components/ListByType";
import RoomList from "../components/HotelList";
import Search from "../components/Search";
import HotelList from "../components/HotelList";

const Home = () => {
  return (
    <section>
      <Hero />
      <Search />
      <div className="py-20 px-4 max-w-6xl m-auto ">
        <Destination />
        <ListByType />
        <HotelList />
      </div>

      <Contact />
    </section>
  );
};

export default Home;
