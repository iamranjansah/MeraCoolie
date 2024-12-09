import mongoose from "mongoose";

import bcrypt from "bcrypt";

// Coolie Schema
const coolieSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  coolieLocation: {
    required: true,
    type: String,
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

coolieSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a model from the schema
const Coolie = mongoose.model("Coolie", coolieSchema);

export default Coolie;
