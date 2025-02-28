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
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/createHotel" element={<CreateHotel />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
