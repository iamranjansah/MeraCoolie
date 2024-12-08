// src/components/HeroSection.jsx
import React, {useState} from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    const [pnr, setPnr] = useState("");

    const handleInputChange = (event) => {
        setPnr(event.target.value); // Update state as user types in input field
    };

    return (
    <main className="flex flex-col items-center justify-center flex-grow mt-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">
        Find <span className="text-blue-500">coolie</span> at your fingertips
      </h1>
      <div className="flex mt-9 items-center justify-center gap-4">
        <div className="flex-1 mt-6">
          <div className="relative w-60 h-60 mx-auto">
            <img
              src="https://www.cooliewale.in/static/media/coolie.80ead0203412f553a161.webp"
              alt="Coolie"
              className="w-full h-full rounded-full border-dashed border-4 border-gray-300 object-cover"
            />
          </div>
        </div>
      </div>

      {/* PNR Search */}
      <div className="mt-8 w-full flex justify-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={pnr}
            onChange={handleInputChange}
            placeholder="Enter your PNR"
            className="w-full px-4 py-3 text-lg border rounded-full shadow focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button className="absolute right-2 top-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600">
          <Link to={`/booking?pnr=${pnr}`} className="text-white hover:text-blue-300">
          🔍
          </Link>
            
          </button>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
