import Contact from "../components/Contact";
import Destination from "../components/Destination";
import Hero from "../components/Hero";
import ListByType from "../components/ListByType";
import RoomList from "../components/RoomList";
import Search from "../components/Search";

const Home = () => {
  return (
    <section>
      <Hero />
      <Search />
      <div className="py-20 px-4 max-w-6xl m-auto ">
        <Destination />
        <ListByType />
        <RoomList />
      </div>

      <Contact />
    </section>
  );
};

export default Home;
