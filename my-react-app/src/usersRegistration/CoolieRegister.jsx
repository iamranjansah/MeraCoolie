// src/pages/CoolieRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CoolieRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    available: false,
    location: "",
    assignedStation: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      available: !prevData.available,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = "Phone number is required.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.assignedStation) newErrors.location = "Station is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Handle the registration logic (e.g., API call)
      console.log("Coolie Registered", formData);

      try {
        const res = await fetch("http://localhost:5143/api//coolie/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        console.log(data);

        if (data && data.id) {
          // localStorage.setItem("coolieId", data.id);
          console.log("Coolie ID saved:", data.id);
        }

        if (data.success) return navigate(`/coolie-profile/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6">
        Coolie Registration
      </h2>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
        onSubmit={handleSubmit}
      >
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-semibold">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Phone Number:
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your location"
          />
          {errors.location && <p className="text-red-500">{errors.location}</p>}
        </div>

        {/* Name of Station */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Station Name:
          </label>
          <input
            type="text"
            name="assignedStation"
            value={formData.assignedStation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your Station Name"
          />
          {errors.assignedStation && (
            <p className="text-red-500">{errors.assignedStation}</p>
          )}
        </div>

        {/*/!* Profile Picture *!/*/}
        {/*<div>*/}
        {/*  <label className="block text-gray-700 font-semibold">Profile Picture:</label>*/}
        {/*  <input*/}
        {/*    type="file"*/}
        {/*    name="profilePicture"*/}
        {/*    onChange={handleFileChange}*/}
        {/*    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"*/}
        {/*  />*/}
        {/*</div>*/}

        {/* Availability Checkbox */}
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="ml-2 text-gray-700">Available for booking</span>
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-bold hover:from-teal-400 hover:to-blue-500 transform transition duration-300"
          >
            Register as Coolie
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoolieRegister;
