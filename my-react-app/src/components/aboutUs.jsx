// src/pages/AboutUs.jsx
import React from "react";
import { FaRegHandshake, FaUser, FaRocket } from "react-icons/fa"; // Importing icons from react-icons
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen  flex flex-col items-center py-12 px-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
        About Us
      </h2>

      {/* Company Introduction */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-8">
        <h3 className="text-2xl font-semibold text-teal-500 mb-4 text-center">
          Our Mission
        </h3>
        <p className="text-gray-600 text-lg text-center">
          We are dedicated to making your travel experience easier and more comfortable
          by providing hassle-free luggage handling. Our mission is to connect you with
          reliable, professional coolies right at your fingertips.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
          <FaUser className="text-5xl text-blue-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-teal-500 text-center">John Doe</h4>
          <p className="text-gray-600 text-center">CEO & Founder</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
          <FaRegHandshake className="text-5xl text-teal-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-teal-500 text-center">Jane Smith</h4>
          <p className="text-gray-600 text-center">Operations Manager</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
          <FaRocket className="text-5xl text-yellow-500 mb-4 mx-auto" />
          <h4 className="text-xl font-semibold text-teal-500 text-center">Alex Johnson</h4>
          <p className="text-gray-600 text-center">Product Lead</p>
        </div>
      </div>

      {/* Timeline/History Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-8">
        <h3 className="text-2xl font-semibold text-teal-500 mb-4 text-center">
          Our Journey
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mr-4">1</span>
            <p className="text-gray-600 text-lg">
              2010: Founded with the vision to simplify luggage handling at stations.
            </p>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mr-4">2</span>
            <p className="text-gray-600 text-lg">
              2015: Expanded operations to multiple cities and added online booking features.
            </p>
          </div>
          <div className="flex items-center">
            <span className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center mr-4">3</span>
            <p className="text-gray-600 text-lg">
              2020: Integrated with train station apps and provided real-time tracking of coolies.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full font-bold hover:from-teal-400 hover:to-blue-500 transform transition duration-300">
        <Link to="/booking" className="text-white hover:text-blue-300">
        Book a Coolie Now
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
