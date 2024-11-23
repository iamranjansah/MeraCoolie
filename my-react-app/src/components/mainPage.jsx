import React, { useState } from "react";
import Steps from "../pages/steps";
import AboutUs from "./aboutUs";
import Booking from "./bookingPage";
import Services from "./Services";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import LoginPage from "../authPages/LoginPage";
import Register from "../authPages/Register"
import ForgotPasswordPage from "../authPages/ForgotPasswordPage";
import UpdatePasswordPage from "../authPages/UpdatePasswordPage";
import CoolieRegister from "../usersRegistration/CoolieRegister";
import CoolieProfile from "../usersRegistration/CoolieProfile";



function App() {
  const [showSteps, setShowSteps] = useState(false);

  const toggleSteps = () => {
    setShowSteps(!showSteps);
  };

  return (
    <>
      <Navbar />
      {/* <Register/> */}
      {/* <LoginPage/> */}
      {/* <ForgotPasswordPage/> */}
      {/* <UpdatePasswordPage/> */}
      {/* <CoolieRegister/> */}
      <CoolieProfile/>
      




      {/* <HeroSection/> */}

      {/* <AboutUs /> */}
      {/* <div className="mt-10 w-full flex flex-col items-center">
       
        <h3 className="text-2xl font-bold text-gray-800">
          Steps for Booking Coolie
        </h3>
        <button
          onClick={toggleSteps}
          className="mt-4 px-6 py-3 text-lg font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-teal-400 hover:to-blue-500 hover:scale-105 focus:ring-4 focus:ring-blue-300"
        >
          {showSteps ? "Hide Steps" : "Show Steps"}
        </button>
      </div> */}

      {/* {showSteps && <Steps />} */}

      {/* <Booking/> */}
      {/* <Services/> */}
    </>
  );
}

export default App;
