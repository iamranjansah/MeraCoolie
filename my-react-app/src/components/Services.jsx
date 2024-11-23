// src/pages/Services.jsx
import React from "react";
import { FaSuitcase, FaClock, FaCreditCard } from "react-icons/fa"; // Importing icons from react-icons
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Luggage Handling",
      description: "Efficient and safe handling of your luggage.",
      icon: <FaSuitcase className="text-4xl text-blue-500" />,
    },
    {
      title: "Priority Services",
      description: "Get a coolie at the earliest with minimal wait time.",
      icon: <FaClock className="text-4xl text-teal-500" />,
    },
    {
      title: "Online Payment",
      description: "Pay online for convenience and transparency.",
      icon: <FaCreditCard className="text-4xl text-yellow-500" />,
    },
  ];

  return (
    <div className="w-full   flex flex-col items-center mt-20 py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
        Our Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-teal-500 mb-4 text-center">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      <div className="mt-8">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full font-bold hover:from-teal-400 hover:to-blue-500 transform transition duration-300">
        <Link to="/booking" className="text-white hover:text-blue-300">
        Book a Coolie Now
          </Link>
          
        </button>
      </div>
    </div>
  );
};

export default Services;
