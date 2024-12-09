import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; // Using Clerk's useUser hook

const UserBookings = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Get user data from Clerk
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    // If user is not signed in, show an error and stop loading orders
    if (isLoaded && !isSignedIn) {
      setError("You must be signed in to view your orders.");
      setIsLoading(false);
      return;
    }

    const fetchOrders = async () => {
      // Ensure the user is signed in and has a clerkId available
      if (user && user.id) {
        try {
          // Fetch orders using the clerkId
          const response = await fetch(
            `http://localhost:5143/api/orders/${user.id}/get-all-orders`,
          );
          const data = await response.json();

          if (data.success) {
            setOrders(data.orders); // Assuming orders data is available in the response
          } else {
            setError(data.message || "Failed to fetch orders.");
          }
        } catch (error) {
          setError("Error fetching orders.: ", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("User or Clerk ID is not available.");
        setIsLoading(false);
      }
    };

    // Fetch orders on initial load
    if (isLoaded && isSignedIn) {
      fetchOrders();
    }

    // Poll every 5 seconds to update the orders in real-time
    const intervalId = setInterval(fetchOrders, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [user, isLoaded, isSignedIn]);

  const handleCancelOrder = async (orderId, coolieId) => {
    try {
      // Send request to cancel the order and update coolie status
      const res = await fetch(
        `http://localhost:5143/api/orders/cancel-coolie/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus: "cancelled",
            coolieStatus: "active",
            coolieId: coolieId._id,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        // Update the order status in the UI without removing it
        setOrders(
          orders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "cancelled" }
              : order,
          ),
        );
      } else {
        setError("Failed to cancel the order.");
      }
    } catch (error) {
      setError("Error cancelling the order: ", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Your Orders
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-gray-800">
                Order ID: {order._id}
              </h4>
              <p className="text-gray-600">
                Coolie Name: {order.coolieId.firstName}{" "}
                {order.coolieId.lastName}
              </p>
              <p className="text-gray-600">
                Coolie Phone No: {order.coolieId.phoneNumber}
              </p>
              <p className="text-gray-600">
                Date: {new Date(order.journeyDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Total Bags: {order.bags}</p>
              <p className="text-gray-600">PNR: {order.pnrNumber}</p>
              <p className="text-gray-600">
                Train No.: {order.trainNumber.split(" ")[0]}
              </p>
              <p className="text-gray-600">Total Price: ₹{order.totalPrice}</p>

              {/* Conditionally render "Cancelled", "Completed" text or Cancel button */}
              {order.orderStatus === "cancelled" ? (
                <p className="text-red-500 font-semibold mt-4">Cancelled</p>
              ) : order.orderStatus === "completed" ? (
                <p className="text-green-500 font-semibold mt-4">Completed</p> // Show "Completed" if order is completed
              ) : (
                <button
                  onClick={() => handleCancelOrder(order._id, order.coolieId)}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold"
                  disabled={order.orderStatus === "completed"} // Disable button if order is completed
                >
                  {order.orderStatus === "completed"
                    ? "Completed"
                    : "Cancel Order"}{" "}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
