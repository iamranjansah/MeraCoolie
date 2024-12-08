import React, { useState } from "react";
import Steps from "../components/steps";
import Services from "../components/Services";
import HeroSection from "../components/HeroSection";

function MainPage() {
  const [showSteps, setShowSteps] = useState(false);

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  return (
    <>
    
      <HeroSection/>

      <div className="mt-10 w-full flex flex-col items-center">
       
        <h3 className="text-2xl font-bold text-gray-800">
          Steps for Booking Coolie
        </h3>
        <button
          onClick={toggleSteps}
          className="mt-4 px-6 py-3 text-lg font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-teal-400 hover:to-blue-500 hover:scale-105 focus:ring-4 focus:ring-blue-300"
        >
          {showSteps ? "Hide Steps" : "Show Steps"}
        </button>
      </div>

      {showSteps && <Steps />}
      <Services/>
      
    </>
  );
}

export default MainPage;
