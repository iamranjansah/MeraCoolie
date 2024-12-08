// src/components/ProfileApproval.jsx
import React, { useState } from "react";

const ProfileApproval = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Coolie 1", status: "pending" },
    { id: 2, name: "Coolie 2", status: "pending" },
  ]);

  const approveProfile = (id) => {
    setProfiles(profiles.map(profile =>
      profile.id === id ? { ...profile, status: "approved" } : profile
    ));
  };

  const rejectProfile = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-bold">Approve or Reject Coolie Profiles</h3>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Coolie Name</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td className="border p-2">{profile.name}</td>
              <td className="border p-2">{profile.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => approveProfile(profile.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectProfile(profile.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded ml-2"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileApproval;
