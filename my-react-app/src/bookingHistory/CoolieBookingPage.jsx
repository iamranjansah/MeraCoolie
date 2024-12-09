import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoolieOrdersPage = () => {
  const [acceptedOrders, setAcceptedOrders] = useState([]); // For accepted orders
  const [completedOrders, setCompletedOrders] = useState([]); // For completed orders
  const [cancelledOrders, setCancelledOrders] = useState([]); // For cancelled orders
  const [editOrder, setEditOrder] = useState(null);
  const [updatedWeight, setUpdatedWeight] = useState(null);

  const { coolieId } = useParams(); // Fetch or use from context / router

  // Fetch orders assigned to the coolie
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5143/api/orders/${coolieId}/get-coolie-orders`,
        );
        if (!response.ok) {
          throw new Error(`Error fetching orders: ${response.status}`);
        }
        const data = await response.json();

        console.log(data);

        // Set individual order categories from the response
        setAcceptedOrders(data.acceptedOrders || []); // Default to empty array if no data
        setCompletedOrders(data.completedOrders || []);
        setCancelledOrders(data.cancelledOrders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [coolieId]);

  const handleWeightChange = (e) => {
    const weight = e.target.value;
    setUpdatedWeight(weight); // Update only weight
  };

  const handleSaveChanges = async (orderId) => {
    try {
      // Ensure weight is filled before sending the request
      if (!updatedWeight || updatedWeight === 0) {
        alert("Please fill in weight");
        return;
      }

      const payload = {
        totalWeight: updatedWeight, // Send updated weight to the backend
      };

      // Sending a PUT request to update the order in the database
      const response = await fetch(
        `http://localhost:5143/api/orders/update-order-details/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Error updating order: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      // Update the UI with the new order details
      setAcceptedOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, ...data.order } : order,
        ),
      );

      // Reset the edit state and input fields
      setEditOrder(null); // Exit edit mode
      setUpdatedWeight(null); // Reset the updated weight

      window.location.reload();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleCompleteBooking = async (orderId) => {
    try {
      // Sending a request to update both the order and coolie status
      const response = await fetch(
        `http://localhost:5143/api/orders/${orderId}/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Update order status and payment status
            status: "completed",
            paymentStatus: "paid",
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Error completing booking: ${response.status}`);
      }

      // Now, send a request to update the coolie's status to active
      const coolieResponse = await fetch(
        `http://localhost:5143/api/coolie/${coolieId}/update-status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "active",
          }),
        },
      );

      if (!coolieResponse.ok) {
        throw new Error(
          `Error updating coolie status: ${coolieResponse.status}`,
        );
      }

      // After successful completion, update the UI
      const data = await response.json();

      // Update the order's status in the frontend
      setAcceptedOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: "completed", paymentStatus: "paid" }
            : order,
        ),
      );

      // Optionally, update the coolie status if needed on the frontend.
      // This can be done in a similar way as the order status, but it's usually handled by the backend.

      setCompletedOrders((prevOrders) => [
        ...prevOrders,
        ...acceptedOrders.filter((order) => order.id === orderId),
      ]);

      // Optionally, clear out the accepted order if it's moved to completed
      setAcceptedOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId),
      );

      window.location.reload();
    } catch (error) {
      console.error("Error completing booking:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
        Your Orders
      </h2>

      <div className="space-y-8">
        <h3 className="text-xl font-semibold text-gray-800">Accepted Orders</h3>
        {acceptedOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {acceptedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>PNR No.:</strong> {order.pnrNo}
                </p>
                <p>
                  <strong>Train No.:</strong> {order.trainNo}
                </p>
                <p>
                  <strong>Bags:</strong> {order.bags}
                </p>
                <p>
                  <strong>Weight:</strong> {order.weight} kg
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{order.totalPrice}
                </p>
                <p>
                  <strong>Customer Name:</strong> {order.customer?.firstName}{" "}
                  {order.customer?.lastName}
                </p>
                <p>
                  <strong>Customer Phone:</strong> {order.customer?.phone}
                </p>

                {editOrder === order.orderId ? (
                  <div>
                    <label htmlFor="weight" className="block">
                      Update Weight:
                    </label>
                    <input
                      type="number"
                      id="weight"
                      value={updatedWeight || order.weight}
                      onChange={handleWeightChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                      onClick={() => handleSaveChanges(order.orderId)}
                      className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditOrder(order.orderId)}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                  >
                    Edit Order
                  </button>
                )}

                <button
                  onClick={() => handleCompleteBooking(order.orderId)}
                  className={`mt-4 px-6 py-2 rounded-lg font-semibold ${
                    order.weight && order.totalPrice
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                  disabled={!order.weight || !order.totalPrice} // Disable if either weight or price is not updated
                >
                  Complete Booking
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No accepted orders found.</p>
        )}

        <h3 className="text-xl font-semibold text-gray-800">
          Completed Orders
        </h3>
        {completedOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>PNR No.:</strong> {order.pnrNo}
                </p>
                <p>
                  <strong>Train No.:</strong> {order.trainNumber}
                </p>
                <p>
                  <strong>Bags:</strong> {order.bags}
                </p>
                <p>
                  <strong>Weight:</strong> {order.weight} kg
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{order.totalPrice}
                </p>
                <p>
                  <strong>Customer Name:</strong> {order.customer?.firstName}{" "}
                  {order.customer?.lastName}
                </p>
                <p>
                  <strong>Customer Phone:</strong> {order.customer?.phone}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No completed orders found.</p>
        )}

        <h3 className="text-xl font-semibold text-gray-800">
          Cancelled Orders
        </h3>
        {cancelledOrders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cancelledOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <p>
                  <strong>Order ID:</strong> {order.orderId}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No cancelled orders found.</p>
        )}
      </div>
    </div>
  );
};

export default CoolieOrdersPage;
