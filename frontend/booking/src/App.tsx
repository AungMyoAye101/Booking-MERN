import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HotelDetail from "./pages/HotelDetail";
import Admin from "./pages/Admin";
import CreateHotel from "./pages/CreateHotel";
import Dashboard from "./components/Dashboard";
import UpdateHotel from "./components/UpdateHotel";
import Search from "./pages/Search";
import Room from "./pages/Room";
import MyBooking from "./pages/MyBooking";


function App() {
  return (
    <BrowserRouter>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/list" element={<List />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mybooking/:id" element={<MyBooking />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Dashboard />} />
          <Route path="room/:hotelId" element={<Room />} />
          <Route path="hotels" element={<List />} />
          <Route path="createHotel" element={<CreateHotel />} />
          <Route path="updateHotel/:id" element={<UpdateHotel />} />
        </Route>
      </Routes>


    </BrowserRouter>
  );
}

export default App;
