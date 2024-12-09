import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default payment method
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extract orderId from query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5143/api/orders/get-orders/${orderId}`,
        ); // Replace with your API endpoint
        const data = await res.json();

        if (data.success) {
          // Map response to the required bookingSummary format
          const fetchedBooking = {
            bookingId: data.order._id, // Assuming _id is the unique identifier
            service: data.order.service || "Coolie Service", // Default service name if not available
            location: data.order.coolieStation || "Not Assigned",
            date: new Date(data.order.journeyDate).toLocaleDateString(), // Format journey date
            time: new Date(data.order.journeyDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }), // Format journey time
            price: data.order.price, // Default price if not available
            orderStatus: data.order.orderStatus,
          };
          setBookingSummary(fetchedBooking);
        } else {
          console.error("Failed to fetch booking details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    if (orderId) {
      fetchBookingDetails();
    }
  }, [orderId]);

  const handlePayment = async () => {
    try {
      setIsLoading(true);

      // Send PUT request to update the order status to "accepted"
      const res = await fetch(
        `http://localhost:5143/api/orders/update-order-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: "accepted" }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setIsPaymentConfirmed(true); // Set the payment confirmation to true
        window.location.reload();
      } else {
        console.error("Failed to update order status:", data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Payment & Checkout
        </h2>

        {bookingSummary ? (
          <>
            {/* Booking Summary */}
            <div className="border-b pb-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Booking Summary
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-semibold">Booking ID:</span>{" "}
                  {bookingSummary.bookingId}
                </p>
                <p>
                  <span className="font-semibold">Service:</span>{" "}
                  {bookingSummary.service}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {bookingSummary.location}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {bookingSummary.date}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {bookingSummary.time}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> ₹
                  {bookingSummary.price}
                </p>
              </div>
            </div>

            {/* Conditional Rendering based on order status */}
            {bookingSummary.orderStatus !== "accepted" ? (
              <>
                {/* Payment Methods */}
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                  Select Payment Method
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio h-6 w-6 text-blue-500"
                    />
                    <span className="text-gray-700 text-lg">
                      Cash On Delivery
                    </span>
                  </div>
                </div>

                {/* Confirm Payment Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={handlePayment}
                    disabled={paymentMethod !== "cod"} // Disable until "Cash On Delivery" is selected
                    className={`w-full py-3 px-4 text-white font-bold rounded-lg transition-all duration-300 ${
                      paymentMethod === "cod"
                        ? "bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-3xl font-semibold text-green-600">
                  Booking Successful!
                </h3>
                <p className="text-gray-600 mt-4">Thank you for booking.</p>
                <p className="text-gray-600 mt-2">
                  Your booking for{" "}
                  <span className="font-semibold">
                    {bookingSummary.service}
                  </span>{" "}
                  has been confirmed.
                </p>
                <p className="text-gray-600 mt-2">
                  Booking ID:{" "}
                  <span className="font-semibold">
                    {bookingSummary.bookingId}
                  </span>
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate("/")} // Reload the page to reset
                    className="py-3 px-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentCheckout;
