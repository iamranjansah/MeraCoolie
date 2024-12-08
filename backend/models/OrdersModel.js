import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  pnrNumber: {
    type: String,
    required: true,
    unique: true,
  },
  trainNumber: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: Date,
    required: true,
  },
  boardingStation: {
    type: String,
    required: true,
  },
  destinationStation: {
    type: String,
    required: true,
  },
  passengers: [
    {
      name: {
        type: String,
        required: true,
      },
      seatNumber: {
        type: String,
        required: true, // Seat number of the passenger
        // Optional: Add validation for seat number format, if needed
      },
      age: {
        type: Number,
        min: 0, // Ensure that age is a positive number
        required: false,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other", "prefer_not_to_say"], // Added "prefer_not_to_say" option
        required: false,
      },
    },
  ], // An array of passengers for the given PNR
  coolieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Coolie assigned
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Customer who created the order
    required: true,
  },
  coolieStation: {
    type: String,
    required: true, // Station where the coolie needs to come
  },
  orderStatus: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bags: {
    type: Number,
    required: true,
  },
  totalWeight: {
    type: Number,
    required: true,
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: false, // Optional feedback rating
    },
    comments: {
      type: String,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
