import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle Forgot Password form submission
  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    // You can replace the alert with an API call to reset the password
    setMessage(`Password reset link sent to ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Forgot Password
        </h2>

        {message && (
          <div className="text-green-500 text-center mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleForgotPassword} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Enter your registered email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md hover:from-teal-400 hover:to-blue-500 transform transition duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
