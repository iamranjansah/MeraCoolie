// src/pages/CoolieLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CoolieLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);

      try {
        // Call the API to login the coolie
        const res = await fetch("http://localhost:5143/api/coolie/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success) {
          // On success, store the JWT token and coolieId
          localStorage.setItem("coolieToken", data.token);
          localStorage.setItem("coolieId", data.coolieId); // Store coolieId

          // Redirect to the profile page of the logged-in Coolie
          navigate(`/coolie-profile/${data.coolieId}`);
        } else {
          // Handle failure (incorrect credentials)
          setErrors({
            general: data.message || "Login failed. Please try again.",
          });
        }
      } catch (error) {
        console.log(error);
        setErrors({ general: "Error logging in. Please try again later." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6">Coolie Login</h2>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4"
        onSubmit={handleSubmit}
      >
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

        {/* General Error Message */}
        {errors.general && <p className="text-red-500">{errors.general}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg font-bold hover:from-teal-400 hover:to-blue-500 transform transition duration-300"
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CoolieLogin;
