import React, { useState } from "react";

const NotificationsPage = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your booking for Coolie service is confirmed for 2024-11-25.",
      read: false,
      type: "Booking",
    },
    {
      id: 2,
      message: "Coolie profile update: Profile approved.",
      read: false,
      type: "Profile Update",
    },
    {
      id: 3,
      message: "Reminder: Payment for Coolie service is due tomorrow.",
      read: false,
      type: "Payment Reminder",
    },
    {
      id: 4,
      message: "Your booking for Coolie service has been rescheduled to 2024-11-26.",
      read: false,
      type: "Booking",
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Notifications
        </h2>

        {/* Mark All as Read Button */}
        <div className="text-right mb-4">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Mark All as Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg shadow-sm ${notification.read ? "bg-gray-200" : "bg-blue-50"}`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-lg font-medium text-gray-800">{notification.message}</div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-2">{notification.type}</div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No notifications available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
