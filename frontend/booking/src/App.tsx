import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
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
import Payment from "./pages/Payment";
import TypeResult from "./pages/TypeResult";
import Footer from "./components/Footer";
import HotelList from "./pages/HotelList";
import ProtectiveRoute from "./components/ProtectiveRoute";




function App() {


  return (
    <BrowserRouter>

      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/list" element={<HotelList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/type/:type" element={<TypeResult />} />
        <Route path="/mybooking/:id" element={<ProtectiveRoute><MyBooking /></ProtectiveRoute>} />


        <Route path="/admin" element={<ProtectiveRoute><Admin /></ProtectiveRoute>}>


          <Route path="" element={<Dashboard />} />

          <Route path="room/:hotelId" element={<Room />} />
          <Route path="hotels" element={<HotelList />} />
          <Route path="createHotel" element={<CreateHotel />} />
          <Route path="updateHotel/:id" element={<UpdateHotel />} />
        </Route>

      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
