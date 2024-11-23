import React, { useState } from "react";
import Steps from "../components/steps";
import AboutUs from "../components/aboutUs";
import Booking from "../components/bookingPage";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LoginPage from "../authPages/LoginPage";
import Register from "../authPages/Register"
import ForgotPasswordPage from "../authPages/ForgotPasswordPage";
import UpdatePasswordPage from "../authPages/UpdatePasswordPage";
import CoolieRegister from "../usersRegistration/CoolieRegister";
import CoolieProfile from "../usersRegistration/CoolieProfile";
import Profile from "../usersRegistration/UserProfile";
import ClientBookingPage from "../bookingHistory/ClientBookingPage";
import CoolieBookingPage from "../bookingHistory/CoolieBookingPage";
import AdminPanel from "./AdminPanel";
import PaymentCheckout from "../payment/PaymentCheckout";
import NotificationsPage from "../notifications/NotificationsPage";
import SearchAndFilterPage from "../searchAndFilter/SearchAndFilterPage";



function MainPage() {
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
      {/* <CoolieProfile/> */}
      {/* <Profile/> */}
      {/* <ClientBookingPage/> */}
      {/* <CoolieBookingPage/> */}
      {/* <AdminPanel/> */}
      <SearchAndFilterPage/>
      

      




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

export default MainPage;
