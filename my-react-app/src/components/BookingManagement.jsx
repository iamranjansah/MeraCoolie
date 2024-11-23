// src/components/BookingManagement.jsx
import React, { useState } from "react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    { id: 1, client: "John Doe", coolie: "Coolie 1", date: "2024-11-20", status: "confirmed" },
    { id: 2, client: "Jane Smith", coolie: "Coolie 2", date: "2024-11-22", status: "pending" },
  ]);

  const deleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Manage Bookings</h3>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Client</th>
            <th className="border p-2">Coolie</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border p-2">{booking.client}</td>
              <td className="border p-2">{booking.coolie}</td>
              <td className="border p-2">{booking.date}</td>
              <td className="border p-2">{booking.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => deleteBooking(booking.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingManagement;
