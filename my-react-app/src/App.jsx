import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            {/* <Route path="/about" element={<AboutUs />} /> */}
          {/* <Route path="/booking" element={<Booking />} /> */}
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
      </Router>
    </>
  );
}

export default App;
