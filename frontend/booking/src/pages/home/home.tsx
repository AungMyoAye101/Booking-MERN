import Contact from "../../components/contact/Contact";
import Hero from "../../components/hero/Hero";
import HotelList from "../../components/hotel-list/HotelList";
import RoomList from "../../components/room/RoomList";
import Showcase from "../../components/showcase/ShowCase";
import "../../global.css";
import useFetch from "../../hooks/usefetch";
const Home = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/api/hotels");
  console.log(data, loading, error);
  return (
    <section>
      <Hero />
      <section className="container">
        <Showcase />
        <HotelList />
        <RoomList />
      </section>
      <Contact />
    </section>
  );
};

export default Home;
