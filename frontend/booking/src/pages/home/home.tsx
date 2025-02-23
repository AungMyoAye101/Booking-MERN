import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import HotelList from "../../components/hotel-list/HotelList";
import RoomList from "../../components/room/RoomList";
import Search from "../../components/search/Search";
import Showcase from "../../components/showcase/ShowCase";
import "./home.css";

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
