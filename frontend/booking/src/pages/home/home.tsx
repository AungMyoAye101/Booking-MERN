import Hero from "../../components/hero/Hero";
import HotelList from "../../components/hotel-list/HotelList";
import RoomList from "../../components/room/RoomList";
import Showcase from "../../components/showcase/ShowCase";
import "../../global.css";
const Home = () => {
  return (
    <section>
      <Hero />
      <section className="container">
        <Showcase />
        <HotelList />
        <RoomList />
      </section>
    </section>
  );
};

export default Home;
