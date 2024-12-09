// src/pages/CoolieProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CoolieProfile = () => {
  const [coolieData, setCoolieData] = useState({
    fullName: "",
    email: "",
    phone: "",
    // experience: "",
    coolieLocation: "",
    status: "",
    assignedStation: "",
    roleIs: "",
  });

  const navigate = useNavigate();

  const { coolieId } = useParams(); // Get coolieId from URL
  console.log("Coolie ID from URL:", coolieId);

  // Fetching data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5143/api/coolie/${coolieId}`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        setCoolieData({
          fullName:
            data.coolieProfile.firstName + " " + data.coolieProfile.lastName,
          email: data.coolieProfile.email,
          phone: data.coolieProfile.phone,
          // experience: data.coolieProfile.experience,
          coolieLocation: data.coolieProfile.coolieLocation,
          assignedStation: data.coolieProfile.assignedStation,
          status: data.coolieProfile.coolieStatus,
          roleIs: data.coolieProfile.role,
        });
      } catch (error) {
        console.error("Failed to fetch coolie data:", error);
      }
    };
    fetchData();
  }, [coolieId]);

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoolieData((prevData) => ({
      ...prevData,
      [name]: value, // This will update the 'status' state properly when a radio button is clicked.
    }));
    console.log(coolieData);
  };

  const handleSaveChanges = async () => {
    try {
      // Transform coolieData if needed

      // console.log("Coolie Data: ", coolieData);

      const payload = {
        updatedProfile: {
          firstName: coolieData.fullName.split(" ")[0],
          lastName: coolieData.fullName.split(" ")[1] || "",
          email: coolieData.email,
          phoneNumber: coolieData.phone,
          // experience: coolieData.experience,
          coolieLocation: coolieData.coolieLocation,
          assignedStation: coolieData.assignedStation,
          status: coolieData.coolieStatus,
          // role: coolieData.roleIs,
        },
      };

      console.log(
        "Payload being sent to API:",
        JSON.stringify(payload, null, 2),
      );

      const response = await fetch(
        `http://localhost:5143/api/coolie/${coolieId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Data received from server:", data.updatedCoolie);

      setCoolieData({
        fullName: `${data.updatedCoolie.firstName} ${data.updatedCoolie.lastName}`,
        email: data.updatedCoolie.email,
        phoneNumber: data.updatedCoolie.phone,
        // experience: data.updatedCoolie.coolieProfile.experience,
        coolieLocation: data.updatedCoolie.coolieLocation,
        assignedStation: data.updatedCoolie.assignedStation,
        status: data.updatedCoolie.status,
        // roleIs: updatedData.coolieProfile.role,
      });

      setEditMode(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to save coolie data:", error.message || error);
    }
  };

  const handleNavigateToBooking = () => {
    // Navigate to the /coolie-booking page with coolieId as a parameter
    navigate(`/coolie-booking/${coolieId}`);
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
              src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {coolieData.fullName}
              </h3>
              <p className="text-gray-600">{coolieData.coolieLocation}</p>
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

            {/* Coolie Booking Button */}
            <button
              onClick={handleNavigateToBooking}
              className="mx-4 px-6 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-lg font-semibold hover:from-blue-500 hover:to-teal-400"
            >
              My Bookings
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap justify-between">
            {/* Full Name */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">
                Full Name:
              </label>
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
              <label className="block text-gray-700 font-semibold">
                Email:
              </label>
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
              <label className="block text-gray-700 font-semibold">
                Phone:
              </label>
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
            {/*<div className="w-full md:w-1/2">*/}
            {/*  <label className="block text-gray-700 font-semibold">*/}
            {/*    Experience (in years):*/}
            {/*  </label>*/}
            {/*  {editMode ? (*/}
            {/*    <input*/}
            {/*      type="number"*/}
            {/*      name="experience"*/}
            {/*      value={coolieData.experience}*/}
            {/*      onChange={handleChange}*/}
            {/*      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"*/}
            {/*    />*/}
            {/*  ) : (*/}
            {/*    <p className="text-gray-800">{coolieData.experience} years</p>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>

          <div className="flex flex-wrap justify-between">
            {/* assignedStation */}
            <div className="w-full md:w-1/2 my-5">
              <label className="block text-gray-700 font-semibold">
                Location:
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="location"
                  value={coolieData.assignedStation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{coolieData.assignedStation}</p>
              )}
            </div>

            {/* Availability (Online/Offline) */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">
                Availability:
              </label>
              {editMode ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status" // Matches the 'status' in state
                      value="active"
                      checked={coolieData.status === "active"} // Correctly reflect the status
                      onClick={handleChange}
                      className="form-radio h-5 w-5 text-blue-500"
                    />
                    <span className="text-gray-700">Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status" // Matches the 'status' in state
                      value="inactive"
                      checked={coolieData.status === "inactive"} // Correctly reflect the status
                      onChange={handleChange}
                      className="form-radio h-5 w-5 text-red-500"
                    />
                    <span className="text-gray-700">Inactive</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-800">{coolieData.status}</p>
              )}
            </div>

            {/* Location */}
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">
                Location:
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="location"
                  value={coolieData.coolieLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              ) : (
                <p className="text-gray-800">{coolieData.coolieLocation}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 font-semibold">
                Rating:
              </label>
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
          {/* <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold text-gray-700">Earnings (Month by Month):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {coolieData.earnings.map((earn, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h4 className="text-lg font-semibold text-gray-800">{earn.month}</h4>
                  <p className="text-gray-600">₹ {earn.amount}</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CoolieProfile;
