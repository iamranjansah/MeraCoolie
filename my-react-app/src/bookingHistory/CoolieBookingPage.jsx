// src/pages/CoolieBookingPage.jsx
import React, { useState, useEffect } from "react";
import bookingsData from "../data/bookings.json";  // Import bookings data from the JSON file

const CoolieBookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch booking data from a JSON file
    setBookings(bookingsData);
  }, []);

  const handleAcceptBooking = (id) => {
    const newBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "Accepted" } : booking
    );
    setBookings(newBookings);
  };

  const handleRejectBooking = (id) => {
    const newBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "Rejected" } : booking
    );
    setBookings(newBookings);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Your Bookings</h2>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{booking.clientName}</h4>
                <p className="text-gray-600">Location: {booking.location}</p>
                <p className="text-gray-600">Date: {booking.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-xl font-semibold ${booking.status === "Accepted" ? "text-green-500" : booking.status === "Rejected" ? "text-red-500" : "text-yellow-500"}`}
                >
                  {booking.status}
                </span>
                {booking.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAcceptBooking(booking.id)}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectBooking(booking.id)}
                      className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoolieBookingPage;
