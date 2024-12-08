import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r ">
      <div className="text-center bg-white shadow-lg rounded-xl p-12 w-full max-w-md">
        <h1 className="text-7xl font-extrabold text-indigo-600 mb-6 animate-bounce">404</h1>
        <p className="text-3xl font-semibold text-gray-700 mb-4">
          Oops! We couldn’t find that page.
        </p>
        <p className="text-lg text-gray-500 mb-8">
          It seems you've reached a broken link or typed the URL incorrectly.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 bg-indigo-600 text-white text-xl rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
