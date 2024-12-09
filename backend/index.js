import bodyParser from "express"; // This should be bodyParser.raw for raw body handling
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routes and controller
import profileRoutes from "./routes/ProfileRoutes.js";
import orderRoutes from "./routes/OrdersRoutes.js";
import { ClerkUserEvent } from "./controllers/ClerkWebhookControllers.js";

dotenv.config({ path: ".env.local" }); // For loading environment variables

const app = express();
const port = process.env.PORT || 5143; // Set the port number from environment or default to 5143
const databaseURL = process.env.DATABASE_URL; // Assuming DATABASE_URL is set in your .env file

const corsOptions = {
  origin: "http://localhost:5173", // Assuming your frontend is running on port 5173
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse the raw body for webhook signature verification
app.use(bodyParser.raw({ type: "application/json" }));

// Set up routes for Profile and Order endpoints
app.use("/api/", profileRoutes);
app.use("/api/orders/", orderRoutes);

// Register Clerk Webhook Handler
app.post("/api/webhooks/clerk", ClerkUserEvent);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// Connect to the MongoDB database
mongoose
  .connect(databaseURL)
  .then(() => console.log("DB connection is successful!"))
  .catch((err) => console.log("DB connection failed", err));
