import React, { useState } from "react";

const PaymentCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard"); // Default payment method
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  // Dummy booking summary data
  const bookingSummary = {
    bookingId: "12345",
    service: "Coolie Service",
    location: "Mumbai Station",
    date: "2024-11-25",
    time: "10:00 AM",
    price: 500,
  };

  const handlePayment = () => {
    setIsPaymentConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-3xl p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Payment & Checkout
        </h2>

        {/* Booking Summary */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Booking Summary</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-semibold">Booking ID:</span> {bookingSummary.bookingId}</p>
            <p><span className="font-semibold">Service:</span> {bookingSummary.service}</p>
            <p><span className="font-semibold">Location:</span> {bookingSummary.location}</p>
            <p><span className="font-semibold">Date:</span> {bookingSummary.date}</p>
            <p><span className="font-semibold">Time:</span> {bookingSummary.time}</p>
            <p><span className="font-semibold">Price:</span> ₹{bookingSummary.price}</p>
          </div>
        </div>

        {/* Payment Methods */}
        {!isPaymentConfirmed ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Select Payment Method</h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-6 w-6 text-blue-500"
                />
                <span className="text-gray-700 text-lg">Credit/Debit Card</span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-6 w-6 text-green-500"
                />
                <span className="text-gray-700 text-lg">Wallet</span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio h-6 w-6 text-teal-500"
                />
                <span className="text-gray-700 text-lg">UPI (Unified Payment Interface)</span>
              </div>
            </div>

            {/* Confirm Payment Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handlePayment}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold rounded-lg hover:from-teal-400 hover:to-blue-500 transition-all duration-300"
              >
                Confirm Payment
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-3xl font-semibold text-green-600">Payment Successful!</h3>
            <p className="text-gray-600 mt-4">Thank you for your payment.</p>
            <p className="text-gray-600 mt-2">
              Your booking for <span className="font-semibold">{bookingSummary.service}</span> has been confirmed.
            </p>
            <p className="text-gray-600 mt-2">
              Booking ID: <span className="font-semibold">{bookingSummary.bookingId}</span>
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()} // Reload the page to reset
                className="py-3 px-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-lg hover:from-blue-500 hover:to-teal-400 transition-all duration-300"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCheckout;
