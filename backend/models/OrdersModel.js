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
  destinationStation: {
    type: String,
    required: true,
  },
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
  },
  bags: {
    type: Number,
    required: true,
  },
  totalWeight: {
    type: Number,
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
