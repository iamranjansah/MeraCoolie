import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate the user after password update

const UpdatePasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    // You can replace the alert with an API call to update the password
    setMessage("Your password has been updated successfully.");
    
    // Redirect to login page after successful password update
    setTimeout(() => {
      navigate("/login"); // Use navigate to redirect the user
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Update Your Password
        </h2>

        {message && (
          <div className={`text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"} mb-4`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          {/* New Password Input */}
          <div>
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter New Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md hover:from-teal-400 hover:to-blue-500 transform transition duration-300"
            >
              Update Password
            </button>
          </div>
        </form>

        {/* Link to Login Page */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Remembered your old password?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
