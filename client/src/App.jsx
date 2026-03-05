import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Seats from "./pages/Seats";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/seats" element={<Seats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
