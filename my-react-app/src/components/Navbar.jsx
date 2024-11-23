// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-2xl font-bold text-blue-500">Find My Coolie</div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="lg:hidden text-gray-600 hover:text-blue-500 focus:outline-none"
        onClick={toggleMenu}
      >
        <i className={`fa ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
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
        <a href="/" className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block">
          Home
        </a>
        <a href="/about" onClick={toggleMenu} className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block">
          About Us
        </a>
        <a href="/booking" onClick={toggleMenu} className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block">
          Booking
        </a>
        <a href="/services" onClick={toggleMenu} className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block">
          Services
        </a>
        <a href="/contact" onClick={toggleMenu} className="text-gray-600 hover:text-blue-500 block py-2 lg:inline-block">
          Contact Us
        </a>

        {/* Sign In Button */}
        <button onClick={toggleMenu} className="block py-2 px-4 bg-yellow-400 text-white rounded-full shadow-md hover:bg-yellow-500 w-3/4 mx-auto mt-4 text-center lg:w-auto lg:mt-0 lg:px-6 lg:py-2">
        <Link to="/singup" className="text-white hover:text-blue-300">
        Sign In
          </Link> 
        </button>
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-0"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
