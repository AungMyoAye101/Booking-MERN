import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Hotel from "./pages/hotel/hotel";
import List from "./pages/list/list";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
