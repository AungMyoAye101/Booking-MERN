import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import List from "./pages/list";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HotelDetail from "./pages/HotelDetail";
import Hotel from "./pages/Hotel";
import Admin from "./pages/Admin";
import CreateHotel from "./pages/CreateHotel";
import Dashboard from "./components/Dashboard";
import UpdateHotel from "./components/UpdateHotel";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Dashboard />} />
          <Route path="hotels" element={<List />} />
          <Route path="createHotel" element={<CreateHotel />} />
          <Route path="updateHotel/:id" element={<UpdateHotel />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
