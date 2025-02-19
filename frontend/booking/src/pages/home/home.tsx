import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import HotelList from "../../components/hotel-list/HotelList";
import RoomList from "../../components/room/RoomList";
import Showcase from "../../components/showcase/ShowCase";
import "./home.css";
import useFetch from "../../hooks/usefetch";
const Home = () => {
  const { data, loading, error } = useFetch("api/hotel");
  console.log(data, loading, error);
  return (
    <section>
      <Hero />
      <div className="con">
        <Showcase />
        <HotelList />
        <RoomList />
      </div>
      <Contact />
    </section>
  );
};

export default Home;
