import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/aboutUs";
import Booking from "./components/bookingPage";
import Services from "./components/Services";
import LoginPage from "./authPages/LoginPage";
import SignupPage from "./authPages/Register";
import ForgotPasswordPage from "./authPages/ForgotPasswordPage";
import PageNotFound from "./components/PageNotFound";
import UpdatePasswordPage from "./authPages/UpdatePasswordPage"
import CoolieRegister from "./usersRegistration/CoolieRegister";
import CoolieProfile from "./usersRegistration/CoolieProfile";
import Profile from "./usersRegistration/UserProfile";
import ClientBookingPage from "./bookingHistory/ClientBookingPage";
import CoolieBookingPage from "./bookingHistory/CoolieBookingPage";
import AdminPanel from "./pages/AdminPanel";
import PaymentCheckout from "./payment/PaymentCheckout";
import NotificationsPage from "./notifications/NotificationsPage";
import SearchAndFilterPage from "./searchAndFilter/SearchAndFilterPage";


function App() {
  return (
    <>
      <Router>
       <Navbar/>
        <Routes >
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/singup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/coolie-prifile-info" element={<CoolieRegister />} />
          <Route path="/coolie-profile" element={<CoolieProfile />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/client-booking" element={<ClientBookingPage />} />
          <Route path="/coolie-booking" element={<CoolieBookingPage />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/payment-checkout" element={<PaymentCheckout />} />
          <Route path="/notification" element={<NotificationsPage />} />
          <Route path="/search-coolie" element={<SearchAndFilterPage />} />
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
