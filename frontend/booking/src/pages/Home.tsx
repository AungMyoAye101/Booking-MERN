import Contact from "../components/Contact";
import Hero from "../components/Hero";
import HotelList from "../components/HotelList";
import RoomList from "../components/RoomList";
import Search from "../components/Search";
import Showcase from "../components/ShowCase";

const Home = () => {
  return (
    <section>
      <Hero />
      <Search />
      <div className="fluid-container ">
        <Showcase />
        <HotelList />
        <RoomList />
      </div>
      <Contact />
    </section>
  );
};

export default Home;
