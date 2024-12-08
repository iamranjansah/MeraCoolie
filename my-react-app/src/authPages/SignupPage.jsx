import React from "react";
import { SignUp } from "@clerk/clerk-react";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <SignUp />
      </div>
    </div>
  );
};

export default SignupPage;