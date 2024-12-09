import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useClerk, useUser } from "@clerk/clerk-react"; // Import Clerk hooks

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser(); // Access the current user from Clerk
  const { signOut } = useClerk(); // Access Clerk's signOut method
  const navigate = useNavigate(); // Initialize useNavigate for redirecting

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    signOut(); // Sign the user out using Clerk's signOut method
    navigate("/"); // Redirect to the home page
  };

  return (
    <div>
      <header className="relative flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <Link to={"/"} className="text-2xl font-bold text-blue-500">
          <div>Find My Coolie</div>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
          onClick={toggleMenu}
        >
          <i
            className={`fa ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
          ></i>
        </button>

        {/* Navigation Links */}
        <nav
          className={`lg:flex space-x-8 lg:space-x-8 ${isMenuOpen ? "block" : "hidden"} lg:block absolute lg:static w-full top-0 left-0 bg-white lg:bg-transparent lg:w-auto p-4 lg:p-0 z-10`}
        >
          {/* Close Button in the Top-right Corner (Mobile) */}
          <button
            className="absolute top-4 right-4 text-gray-600 lg:hidden"
            onClick={toggleMenu}
          >
            <i className="fa fa-times text-xl"></i>
          </button>

          {/* Navigation Links */}
          <a
            href="/"
            className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block"
          >
            Home
          </a>
          <a
            href="/about"
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block"
          >
            About Us
          </a>

          {/* Conditionally Render 'Booking' Link if User is Logged In */}
          {user && (
            <a
              href="/my-booking"
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block"
            >
              My Booking
            </a>
          )}

          <a
            href="/contact"
            onClick={toggleMenu}
            className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block"
          >
            Contact Us
          </a>

          {/* Login/Logout Button */}
          {user ? (
            // If user is logged in, show the Logout button
            <button
              onClick={handleLogout}
              className="flex items-center block py-2 px-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 w-3/4 mx-auto mt-4 text-center lg:w-auto lg:mt-0 lg:px-6 lg:py-2"
            >
              {/* Display user image if available */}
              {user.profileImageUrl && (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2" // Add some margin to the right of the image
                />
              )}
              Logout
            </button>
          ) : (
            // If user is not logged in, show the Sign In button
            <button className="block py-2 px-4 bg-yellow-400 text-white rounded-full shadow-md hover:bg-yellow-500 w-3/4 mx-auto mt-4 text-center lg:w-auto lg:mt-0 lg:px-6 lg:py-2">
              <Link to="/login" className="text-white hover:text-blue-300">
                Sign In
              </Link>
            </button>
          )}
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-0"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
