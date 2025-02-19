import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/hotel";
import List from "./pages/list/list";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
