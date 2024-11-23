// ../pages/Steps.jsx
import React from "react";

const Steps = () => {
  return (
    <div className="mt-10 w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
            1
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Enter your PNR</p>
        </div>

        {/* Dotted Line */}
        <div className="border-l-2 border-dotted border-gray-400 h-12"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
            2
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Coolie is assigned</p>
        </div>

        {/* Dotted Line */}
        <div className="border-l-2 border-dotted border-gray-400 h-12"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
            3
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Luggage is weighed</p>
        </div>

        {/* Dotted Line */}
        <div className="border-l-2 border-dotted border-gray-400 h-12"></div>

        {/* Step 4 */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
            4
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Pay the amount through App or Cash
          </p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
