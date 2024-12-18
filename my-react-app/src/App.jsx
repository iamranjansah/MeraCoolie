import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/aboutUs";
import Booking from "./components/bookingPage";
import Services from "./components/Services";
import LoginPage from "./authPages/LoginPage"; // Clerk's LoginPage
import SignupPage from "./authPages/SignupPage"; // Clerk's SignupPage
import CoolieRegister from "./usersRegistration/CoolieRegister";
import CoolieProfile from "./usersRegistration/CoolieProfile";
import UserBookings from "./bookingHistory/UserBookings.jsx";
import CoolieBookingPage from "./bookingHistory/CoolieBookingPage";
import AdminPanel from "./pages/AdminPanel";
import PaymentCheckout from "./payment/PaymentCheckout";
import Profile from "./usersRegistration/UserProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CoolieLogin from "./authPages/CoolieLogin.jsx";
import { ProtectedRouteCoolie } from "./components/ProtectedRouteCoolie.jsx";

// Import Clerk components

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*<Route path="*" element={<PageNotFound />} />*/}

        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/coolie-register" element={<CoolieRegister />} />
        <Route path="/coolie-login" element={<CoolieLogin />} />

        {/* Coolie Profile*/}

        <Route
          path="/coolie-profile/:coolieId"
          element={<ProtectedRouteCoolie />} // This wraps the route
        >
          <Route path="" element={<CoolieProfile />} />{" "}
          {/* This is the component to render */}
        </Route>

        {/* Protected Routes */}

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* User Booking and Admin Routes */}
        <Route
          path="/my-booking"
          element={
            <ProtectedRoute>
              <UserBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coolie-booking/:coolieId"
          element={
            // <ProtectedRoute>
            <CoolieBookingPage />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/payment-checkout"
          element={
            <ProtectedRoute>
              <PaymentCheckout />
            </ProtectedRoute>
          }
        />

        {/*<Route path="/notification" element={<NotificationsPage />} />*/}
        {/*<Route path="/search-coolie" element={<SearchAndFilterPage />} />*/}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
