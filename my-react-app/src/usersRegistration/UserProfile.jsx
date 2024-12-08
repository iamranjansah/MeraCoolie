// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import "../index.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const userId = user.user.id;

  const [editMode, setEditMode] = useState(false);

  const fetchUserDetails = async () => {
    try {
      if (!userId) {
        console.error("User ID is not available.");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:5143/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        console.log("Setting user data:", data.userProfile);
        setUserData(data.userProfile);
      }
    } catch (error) {
      console.log("Error fetching user details: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Dummy function to save changes
  const handleSaveChanges = async () => {
    setEditMode(false);
    console.log("Profile updated:", userData);

    try {
      const res = await fetch(
        `http://localhost:5143/api/users/updateProfile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ updatedProfile: userData }),
        },
      );

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.user.id && loading) fetchUserDetails();
  }, []);

  // Display loading or error states
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          User Dashboard
        </h2>

        <div className="flex items-center justify-between mb-8 px-10 py-5">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <img
              src="/user.png"
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-4 border-gray-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {userData.firstName} {userData.lastName}
              </h3>
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

        <div className="space-y-6 mx-16">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-semibold">
              First Name:
            </label>
            {editMode ? (
              <input
                type="text"
                name="fullName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{userData.firstName}</p>
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
                required
                value={userData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>

          {/*/!* Location *!/*/}
          {/*<div>*/}
          {/*  <label className="block text-gray-700 font-semibold">*/}
          {/*    Location:*/}
          {/*  </label>*/}
          {/*  {editMode ? (*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      name="location"*/}
          {/*      value={userData.location}*/}
          {/*      disabled*/}
          {/*      onChange={handleChange}*/}
          {/*      className="w-full px-4 py-2 border rounded-lg"*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    <p className="text-gray-800">{userData.location}</p>*/}
          {/*  )}*/}
          {/*</div>*/}

          {/*  /!* Rating *!/*/}
          {/*  <div>*/}
          {/*    <label className="block text-gray-700 font-semibold">Rating:</label>*/}
          {/*    <div className="flex items-center">*/}
          {/*      <span className="text-gray-800">{userData.rating} / 5</span>*/}
          {/*      <div className="flex items-center">*/}
          {/*        {Array.from({ length: 5 }, (_, index) => (*/}
          {/*          <i*/}
          {/*            key={index}*/}
          {/*            className={`fas fa-star ${*/}
          {/*              index < userData.rating*/}
          {/*                ? "text-yellow-500"*/}
          {/*                : "text-gray-300"*/}
          {/*            }`}*/}
          {/*          />*/}
          {/*        ))}*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  /!* Role-based fields *!/*/}
          {/*  {userData.role === "Coolie" && (*/}
          {/*    <>*/}
          {/*      /!* Additional fields only for Coolie *!/*/}
          {/*      <div>*/}
          {/*        <label className="block text-gray-700 font-semibold">*/}
          {/*          Experience (in years):*/}
          {/*        </label>*/}
          {/*        {editMode ? (*/}
          {/*          <input*/}
          {/*            type="number"*/}
          {/*            name="experience"*/}
          {/*            value={userData.experience || ""}*/}
          {/*            onChange={handleChange}*/}
          {/*            className="w-full px-4 py-2 border rounded-lg"*/}
          {/*          />*/}
          {/*        ) : (*/}
          {/*          <p className="text-gray-800">{userData.experience} years</p>*/}
          {/*        )}*/}
          {/*      </div>*/}

          {/*      <div>*/}
          {/*        <label className="block text-gray-700 font-semibold">*/}
          {/*          Availability:*/}
          {/*        </label>*/}
          {/*        {editMode ? (*/}
          {/*          <div>*/}
          {/*            <label>*/}
          {/*              <input*/}
          {/*                type="radio"*/}
          {/*                name="availability"*/}
          {/*                value="Online"*/}
          {/*                checked={userData.availability === "Online"}*/}
          {/*                onChange={handleChange}*/}
          {/*              />*/}
          {/*              Online*/}
          {/*            </label>*/}
          {/*            <label>*/}
          {/*              <input*/}
          {/*                type="radio"*/}
          {/*                name="availability"*/}
          {/*                value="Offline"*/}
          {/*                checked={userData.availability === "Offline"}*/}
          {/*                onChange={handleChange}*/}
          {/*              />*/}
          {/*              Offline*/}
          {/*            </label>*/}
          {/*          </div>*/}
          {/*        ) : (*/}
          {/*          <p className="text-gray-800">{userData.availability}</p>*/}
          {/*        )}*/}
          {/*      </div>*/}

          {/*      /!* Earnings *!/*/}
          {/*      <div>*/}
          {/*        <label className="block text-gray-700 font-semibold">*/}
          {/*          Earnings (Month by Month):*/}
          {/*        </label>*/}
          {/*        {editMode ? (*/}
          {/*          <div>/!* Implement earnings editing logic *!/</div>*/}
          {/*        ) : (*/}
          {/*          <div>/!* Display earnings if applicable *!/</div>*/}
          {/*        )}*/}
          {/*      </div>*/}
          {/*    </>*/}
          {/*  )}*/}
        </div>
      </div>
    </div>
  );
};

export default Profile;
