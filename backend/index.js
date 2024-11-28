import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Consider using ES6 import syntax for consistency
import profileRoutes from "./routes/ProfileRoutes.js";
import orderRoutes from "./routes/OrdersRoutes.js";
dotenv.config({ path: ".env.local" }); // For loading environment variables

const app = express();
const port = process.env.PORT || 3000; // Set the port number from environment or default to 3000
const databaseURL = process.env.DATABASE_URL; // Assuming DATABASE_URL is set in your .env file

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/", profileRoutes);
app.use("/api/orders/", orderRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => console.log("DB connection is successfull !"))
  .catch((err) => console.log(err));
