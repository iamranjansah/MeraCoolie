// src/pages/Profile.jsx
import React, { useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    location: "Mumbai, India",
    profilePicture: "https://www.example.com/profile.jpg",
    role: "User", // or "Coolie"
    rating: 4.5, // Default rating for all users
  });

  const [editMode, setEditMode] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Dummy function to save changes
  const handleSaveChanges = () => {
    setEditMode(false);
    console.log("Profile updated:", userData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          User Dashboard
        </h2>

        <div className="flex items-center justify-between mb-8">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{userData.fullName}</h3>
              <p className="text-gray-600">{userData.location}</p>
            </div>
          </div>

          <div>
            {/* Edit Profile Button */}
            {editMode ? (
              <button
                onClick={handleSaveChanges}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-semibold"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Full Name:</label>
            {editMode ? (
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{userData.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">Email:</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{userData.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-semibold">Phone:</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold">Location:</label>
            {editMode ? (
              <input
                type="text"
                name="location"
                value={userData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{userData.location}</p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-semibold">Rating:</label>
            <div className="flex items-center">
              <span className="text-gray-800">{userData.rating} / 5</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    key={index}
                    className={`fas fa-star ${
                      index < userData.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Role-based fields */}
          {userData.role === "Coolie" && (
            <>
              {/* Additional fields only for Coolie */}
              <div>
                <label className="block text-gray-700 font-semibold">Experience (in years):</label>
                {editMode ? (
                  <input
                    type="number"
                    name="experience"
                    value={userData.experience || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                ) : (
                  <p className="text-gray-800">{userData.experience} years</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Availability:</label>
                {editMode ? (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="availability"
                        value="Online"
                        checked={userData.availability === "Online"}
                        onChange={handleChange}
                      />
                      Online
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="availability"
                        value="Offline"
                        checked={userData.availability === "Offline"}
                        onChange={handleChange}
                      />
                      Offline
                    </label>
                  </div>
                ) : (
                  <p className="text-gray-800">{userData.availability}</p>
                )}
              </div>

              {/* Earnings */}
              <div>
                <label className="block text-gray-700 font-semibold">Earnings (Month by Month):</label>
                {editMode ? (
                  <div>
                    {/* Implement earnings editing logic */}
                  </div>
                ) : (
                  <div>
                    {/* Display earnings if applicable */}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
