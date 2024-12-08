import React, { useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react"; // Import Clerk hooks
import UserManagement from "../components/UserManagement";
import BookingManagement from "../components/BookingManagement";
import Reports from "../components/Reports";
import ProfileApproval from "../components/ProfileApproval";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("userManagement");
  const { user, isLoaded, isSignedIn } = useUser(); // Get user and auth state from Clerk

  // If Clerk is still loading or user is not signed in, redirect to sign-in page
  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "userManagement":
        return <UserManagement />;
      case "bookingManagement":
        return <BookingManagement />;
      case "reports":
        return <Reports />;
      case "profileApproval":
        return <ProfileApproval />;
      default:
        return <div>Select a tab to view its content</div>;
    }
  };

  const handleLogout = () => {
    // Logic for handling logout
    console.log("Logged out");
    // Clerk automatically handles logout when you use the ClerkProvider.
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gradient-to-br from-blue-800 to-blue-600 text-white shadow-md">
        <div className="py-6 px-4 text-center border-b border-blue-700">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full text-left px-6 py-3 font-medium rounded-md transition-all ${
                  activeTab === "userManagement"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => setActiveTab("userManagement")}
              >
                User Management
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-6 py-3 font-medium rounded-md transition-all ${
                  activeTab === "bookingManagement"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => setActiveTab("bookingManagement")}
              >
                Booking Management
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-6 py-3 font-medium rounded-md transition-all ${
                  activeTab === "reports"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => setActiveTab("reports")}
              >
                Reports
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-6 py-3 font-medium rounded-md transition-all ${
                  activeTab === "profileApproval"
                    ? "bg-white text-blue-800 shadow-lg"
                    : "hover:bg-blue-700"
                }`}
                onClick={() => setActiveTab("profileApproval")}
              >
                Profile Approval
              </button>
            </li>
          </ul>
        </nav>
        <footer className="mt-auto py-4 text-center text-sm text-blue-200 border-t border-blue-700">
          &copy; {new Date().getFullYear()} Coolie Services
        </footer>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        {/* Header with Logout Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{`${
            activeTab === "userManagement"
              ? "User Management"
              : activeTab === "bookingManagement"
              ? "Booking Management"
              : activeTab === "reports"
              ? "Reports"
              : "Profile Approval"
          }`}</h2>
          
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg p-6">
          <div>{renderTabContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
