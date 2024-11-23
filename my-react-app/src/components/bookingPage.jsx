// src/pages/Booking.jsx
import React from "react";

const Booking = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6">Book Your Coolie</h2>
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
        {/* PNR Field */}
        <label className="block text-gray-700 font-semibold">Enter Your PNR:</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter PNR"
        />

        {/* Coolie Preference */}
        <label className="block text-gray-700 font-semibold">
          Select Coolie Preference:
        </label>
        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
          <option value="any">Any Coolie</option>
          <option value="priority">Priority Coolie</option>
          <option value="family-friendly">Family-Friendly Coolie</option>
        </select>

        {/* Estimated Luggage Weight */}
        <label className="block text-gray-700 font-semibold">
          Estimated Luggage Weight (in KG):
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter Weight"
        />

        {/* Number of Bags */}
        <label className="block text-gray-700 font-semibold">
          Number of Bags:
        </label>
        <input
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter Number of Bags"
        />

        {/* Book Coolie Button */}
        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-bold hover:from-teal-400 hover:to-blue-500 transform transition duration-300">
          Book Coolie
        </button>
      </form>
    </div>
  );
};

export default Booking;
