// src/pages/CoolieProfile.jsx
import React, { useState, useEffect } from "react";

const CoolieProfile = () => {
  const [coolieData, setCoolieData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    experience: 5,
    location: "Mumbai, India",
    profilePicture: "https://www.example.com/profile.jpg",
    rating: 4.5,
    availability: "Online", // Can be "Online" or "Offline"
    earnings: [
      { month: "January", amount: 1200 },
      { month: "February", amount: 1500 },
      { month: "March", amount: 1000 },
      { month: "April", amount: 1300 },
    ],
  });

  const [editMode, setEditMode] = useState(false);

  // Dummy function for saving changes
  const handleSaveChanges = () => {
    // You can make an API call here to save the updated data
    setEditMode(false);
    console.log("Profile updated:", coolieData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoolieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setCoolieData((prevData) => ({
      ...prevData,
      available: !prevData.available,
    }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Coolie Dashboard
        </h2>

        <div className="flex items-center justify-between mb-8">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <img
              src={coolieData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{coolieData.fullName}</h3>
              <p className="text-gray-600">{coolieData.location}</p>
            </div>
          </div>

          <div>
            {/* Edit Profile Button */}
            {editMode ? (
              <button
                onClick={handleSaveChanges}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold hover:from-teal-400 hover:to-blue-500"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold hover:from-teal-400 hover:to-blue-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap justify-between">
            {/* Full Name */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">Full Name:</label>
              {editMode ? (
                <input
                  type="text"
                  name="fullName"
                  value={coolieData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{coolieData.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">Email:</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={coolieData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{coolieData.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            {/* Phone */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">Phone:</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={coolieData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{coolieData.phone}</p>
              )}
            </div>

            {/* Experience */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">Experience (in years):</label>
              {editMode ? (
                <input
                  type="number"
                  name="experience"
                  value={coolieData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{coolieData.experience} years</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between">
            {/* Availability (Online/Offline) */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">Availability:</label>
              {editMode ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="availability"
                      value="Online"
                      checked={coolieData.availability === "Online"}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span className="text-gray-700">Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="availability"
                      value="Offline"
                      checked={coolieData.availability === "Offline"}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-red-500"
                    />
                    <span className="text-gray-700">Offline</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800">{coolieData.availability}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">Rating:</label>
              <div className="flex items-center space-x-2">
                <span className="text-gray-800">{coolieData.rating} / 5</span>
                <div className="flex items-center">
                  <i className="fas fa-star text-yellow-500"></i>
                  <i className="fas fa-star text-yellow-500"></i>
                  <i className="fas fa-star text-yellow-500"></i>
                  <i className="fas fa-star text-yellow-500"></i>
                  <i className="fas fa-star text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings */}
          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-gray-700">Earnings (Month by Month):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {coolieData.earnings.map((earn, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800">{earn.month}</h4>
                  <p className="text-gray-600">₹ {earn.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoolieProfile;
