import React, { useState } from "react";

const SignupPage = () => {
  const [userType, setUserType] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Signup form submission
  const handleSignup = (e) => {
    e.preventDefault();
    alert("Signup Form Submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* User Type - Radio Buttons */}
          <div>
            <label className="block text-gray-700 font-semibold">
              I am a:
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="coolie"
                  checked={userType === "coolie"}
                  onChange={() => setUserType("coolie")}
                  className="mr-2"
                />
                Coolie (Porter)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="passenger"
                  checked={userType === "passenger"}
                  onChange={() => setUserType("passenger")}
                  className="mr-2"
                />
                Passenger
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-md hover:from-teal-400 hover:to-blue-500 transform transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
