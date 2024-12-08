// src/pages/ClientBookingPage.jsx
import React, { useState, useEffect } from "react";
import cooliesData from "../data/coolies.json";  // Import coolie data from the JSON file

const ClientBookingPage = () => {
  const [coolies, setCoolies] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch coolie data from a JSON file
    setCoolies(cooliesData);
  }, []);

  const handleBookCoolie = (coolie) => {
    alert(`You have booked ${coolie.fullName}`);
    // Add API call to book the coolie here
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Book a Coolie</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coolies.map((coolie) => (
            <div key={coolie.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={coolie.profilePicture}
                alt={coolie.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">{coolie.fullName}</h4>
              <p className="text-gray-600">{coolie.location}</p>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">{"★".repeat(Math.floor(coolie.rating))}</span>
                <span className="text-gray-600">{coolie.rating} / 5</span>
              </div>
              <button
                onClick={() => handleBookCoolie(coolie)}
                className={`mt-4 px-6 py-2 bg-gradient-to-r ${coolie.available ? 'from-blue-500 to-teal-400' : 'from-gray-500 to-gray-400'} text-white rounded-lg font-semibold`}
                disabled={!coolie.available}
              >
                {coolie.available ? "Book Now" : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientBookingPage;
