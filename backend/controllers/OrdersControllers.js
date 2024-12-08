import puppeteer from "puppeteer";
import axios from "axios";

import Order from "../models/OrdersModel.js";
import Coolie from "../models/CoolieModel.js";

async function fetchTrainDetails(trainNumber) {
  const apiUrl = `https://rappid.in/apis/train.php?train_no=${trainNumber}`;

  try {
    const response = await axios.get(apiUrl);
    const trainDetails = response.data;
    console.log(`Train details for ${trainNumber}:`, trainDetails);
    return trainDetails;
  } catch (error) {
    console.error(`Error fetching train details:`, error.message);
  }
}

export const getTrainStatus = async (req, res) => {
  const { pnr } = req.params;

  const pnrUrl = `https://www.trainman.in/pnr/${pnr}`;
  const browser = await puppeteer.launch({ headless: "new" });

  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0...");
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setDefaultTimeout(60000);

    await page.goto(pnrUrl, { waitUntil: "networkidle0", timeout: 60000 });

    const trainNumberSelector = "div.font-weight-bold u";
    const trainNumber = await page
      .waitForSelector(trainNumberSelector, { timeout: 30000 })
      .then((element) => element.evaluate((el) => el.textContent.trim()));

    console.log(`Train Number for PNR ${pnr}: ${trainNumber}`);

    // Fetch the details for the train number from the API
    const trainDetails = await fetchTrainDetails(trainNumber);

    res.status(200).json({
      success: true,
      message: trainDetails,
    });
  } catch (error) {
    console.error(`Error fetching train number for PNR ${pnr}:`, error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    await browser.close();
  }
};

export const bookCoolie = async (req, res) => {
  try {
    const {
      pnrNumber,
      trainNumber,
      journeyDate,
      boardingStation,
      destinationStation,
      passengers,
      coolieStation,
      totalBags,
    } = req.body;

    const { userId } = req.params; // Get userId from URL params

    // Validate required fields
    if (
      !userId ||
      !pnrNumber ||
      !trainNumber ||
      !journeyDate ||
      !boardingStation ||
      !destinationStation ||
      !Array.isArray(passengers) ||
      passengers.length === 0 ||
      !coolieStation ||
      !totalBags
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid fields in the request",
      });
    }

    // Extract primary passenger's name
    const primaryPassengerName = passengers[0]?.name;
    if (!primaryPassengerName) {
      return res.status(400).json({
        success: false,
        message: "Primary passenger name is missing",
      });
    }

    // Find the customer by userId (updated from clerkId)
    const customer = await User.findById(userId); // Using findById to find customer by userId
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Find an available coolie at the requested station with status "active"
    const availableCoolie = await Coolie.findOne({
      assignedStation: coolieStation,
      status: "active",
    });

    if (!availableCoolie) {
      return res.status(404).json({
        success: false,
        message: `No available coolie found at ${coolieStation}`,
      });
    }

    // Create a new order
    const order = new Order({
      pnrNumber,
      trainNumber,
      journeyDate,
      boardingStation,
      destinationStation,
      passengerName: primaryPassengerName,
      coolieId: availableCoolie._id,
      customerId: customer._id,
      coolieStation,
      totalBags,
      orderStatus: "pending",
      paymentStatus: "pending",
    });

    // Start a session for transactions
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Save the order to the database
      await order.save({ session });

      // Update the customer's orders array
      customer.orderDetails.orders.push(order._id);
      await customer.save({ session });

      // Update coolie's status to "on duty" and add the order to their orders array
      availableCoolie.status = "on duty";
      availableCoolie.orders.push(order._id);
      await availableCoolie.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Respond with the created order details
      res.status(201).json({
        success: true,
        message:
          "Coolie successfully booked. Weight and price will be added later.",
        order,
      });
    } catch (transactionError) {
      // Rollback transaction in case of error
      await session.abortTransaction();
      session.endSession();

      console.error(
        "Transaction error while booking coolie:",
        transactionError,
      );
      res.status(500).json({
        success: false,
        message: "Failed to book coolie due to a database error",
      });
    }
  } catch (err) {
    console.error("Error booking coolie:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateOrderDetailsByCoolie = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { totalWeight } = req.body;

    const totalPrice = totalWeight * 20;

    // Validate input
    if (!totalWeight || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "Total weight and price are required",
      });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Update the order details
    order.totalWeight = totalWeight;
    order.totalPrice = totalPrice;
    order.priceUpdatedByCoolie = true;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order details updated successfully",
      order,
    });
  } catch (err) {
    console.error("Error updating order details:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const user = await User.findById(userId).populate({
      path: "orderDetails.orders",
      model: "Order",
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If user is found, return the orders
    return res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders: user.orderDetails.orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params; // Extract orderId from the URL params

    // Validate orderId
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order Id is required",
      });
    }

    // Find the order by orderId
    const order = await Order.findById(orderId).populate({
      path: "coolieId customerId", // Populate coolie and customer details
      select: "firstName lastName", // Return only relevant fields
    });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Return the order details
    return res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const toggleCoolieAvailablity = async (req, res) => {
  try {
    const { coolieId } = req.body;

    if (!coolieId) {
      return res.status(400).json({
        success: false,
        message: "Coolie not found",
      });
    }

    const coolie = await Coolie.findById(coolie);

    if (!coolie) {
      return res.status(404).json({
        success: false,
        message: "Coolie not found",
      });
    }

    if (coolie.status === "active") {
      coolie.status = "inactive"; // If the coolie is active, set to inactive
    } else if (coolie.status === "inactive") {
      coolie.status = "active"; // If the coolie is inactive, set to active
    } else {
      coolie.status = "active"; // If the coolie is "on duty", we set it to active
    }

    await coolie.save();

    res.status(200).json({
      success: true,
      message: `Coolie's availability has been updated to ${coolie.status}`,
      status: coolie.status,
    });
  } catch (error) {
    console.log("Error toggling coolie availablity", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
