import React, { useState } from "react";

const UserManagement = () => {
  // Dummy data for users and coolies
  const [data, setData] = useState([
    { id: 1, name: "John Doe", role: "User", email: "john@example.com", rating: 4.8 },
    { id: 2, name: "Jane Smith", role: "Coolie", email: "jane@example.com", rating: 4.5 },
    { id: 3, name: "Bob Johnson", role: "User", email: "bob@example.com", rating: 3.9 },
    { id: 4, name: "Alice Brown", role: "Coolie", email: "alice@example.com", rating: 4.7 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered data based on search
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">User and Coolie Ratings</h3>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="px-6 py-3 text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-sm font-semibold">Rating</th>
              <th className="px-6 py-3 text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-3 text-sm text-gray-700">{user.id}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-3 text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-3 text-sm text-yellow-500 font-bold">
                  {user.rating} / 5
                </td>
                <td className="px-6 py-3 text-sm">
                  <button className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                    View
                  </button>
                  <button className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
