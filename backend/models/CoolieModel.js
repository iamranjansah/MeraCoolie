import mongoose from "mongoose";

// Coolie Schema
const coolieSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true, // Clerk ID should be unique to each coolie
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  assignedStation: {
    type: String, // Station where the coolie is assigned to work
    required: true,
  },
  role: {
    type: String,
    enum: ["coolie"], // Fixed to 'coolie' for this model
    default: "coolie",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // References the 'Order' model where the coolie is assigned
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive", "on duty"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Coolie = mongoose.model("Coolie", coolieSchema);

export default Coolie;
