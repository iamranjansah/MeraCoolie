import puppeteer from "puppeteer";
import axios from "axios";

import Order from "../models/OrdersModel.js";
import Coolie from "../models/CoolieModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

async function fetchTrainDetails(trainNumber) {
  const apiUrl = `https://rappid.in/apis/train.php?train_no=${trainNumber}`;

  try {
    const response = await axios.get(apiUrl);
    const trainDetails = response.data;
    console.log(`Train details for ${trainNumber}:`, trainDetails);
    return trainDetails;
  } catch (error) {
    console.error(`Error fetching train details:`, error.message);
    throw new Error("Failed to fetch train details.");
  }
}

export const getTrainStatus = async (req, res) => {
  const { pnr } = req.params;
  const pnrUrl = `https://www.trainman.in/pnr/${pnr}`;
  const browser = await puppeteer.launch({ headless: "new" });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    );
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setDefaultNavigationTimeout(90000);

    await page.goto(pnrUrl, { waitUntil: "domcontentloaded" });

    // Wait for and extract the train number
    const trainNumberSelector = "div.font-weight-bold u";
    const trainNumber = await page
      .waitForSelector(trainNumberSelector, { timeout: 30000 })
      .then((element) => element.evaluate((el) => el.textContent.trim()));

    console.log(`Train Number for PNR ${pnr}: ${trainNumber}`);

    // Fetch train details using the train number
    const trainDetails = await fetchTrainDetails(trainNumber);

    res.status(200).json({
      success: true,
      message: trainDetails,
    });
  } catch (error) {
    console.error(`Error fetching train number for PNR ${pnr}:`, error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export const bookCoolie = async (req, res) => {
  try {
    const {
      pnrNumber,
      trainNumber,
      journeyDate,
      destinationStation,
      coolieStation,
      totalBags,
    } = req.body;

    const { userId } = req.params; // Get userId from URL params

    console.log(typeof userId);

    console.log(req.body);

    // Validate required fields
    if (
      !userId ||
      !pnrNumber ||
      !trainNumber ||
      !journeyDate ||
      !destinationStation ||
      !coolieStation ||
      !totalBags
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid fields in the request",
      });
    }

    // Find the customer by userId (updated from clerkId)
    const customer = await User.findOne({ clerkId: userId });

    console.log(customer);

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
      destinationStation,
      coolieId: availableCoolie._id,
      customerId: customer._id,
      coolieStation,
      bags: totalBags,
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

export const cancelCoolie = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus, coolieStatus, coolieId } = req.body;

    // Validate the data
    if (!orderId || !orderStatus || !coolieStatus || !coolieId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    // Find and update the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Update order status
    order.orderStatus = orderStatus;
    await order.save();

    // Find and update the coolie status
    const coolie = await Coolie.findById(coolieId);
    if (!coolie) {
      return res.status(404).json({
        success: false,
        message: "Coolie not found.",
      });
    }

    coolie.status = coolieStatus;
    await coolie.save();

    return res.status(200).json({
      success: true,
      message: "Order and Coolie status updated successfully.",
    });
  } catch (error) {
    console.error("Error canceling order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const updateOrderDetailsByCoolie = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { totalWeight } = req.body;

    const totalPrice = totalWeight * 5;

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

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    // Validate input
    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
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

    // Update the order status
    order.orderStatus = orderStatus;

    // Save the updated order
    await order.save();

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${orderStatus} successfully`,
      order,
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const completeOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update order status and payment status
    order.orderStatus = "completed";
    order.paymentStatus = "paid";

    // Save the updated order
    const updatedOrder = await order.save();

    // Optionally, you can handle any other logic, like sending notifications, etc.

    // Send response with updated order details
    res.status(200).json({
      message: "Order completed successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error completing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required",
      });
    }

    const user = await User.findOne({ clerkId: userId }).populate({
      path: "orderDetails.orders",
      model: "Order",
      populate: {
        path: "coolieId", // Populate the coolie details in each order
        model: "Coolie",
        select: "firstName lastName phoneNumber", // Select only relevant fields from the coolie
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // console.log(user.orderDetails.orders[0].coolieId);

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

export const getAllCoolieOrders = async (req, res) => {
  const { coolieId } = req.params; // Extract coolieId from route parameters

  // Validate coolieId
  if (!coolieId) {
    return res.status(400).json({ message: "Coolie ID is required." });
  }

  try {
    // Step 1: Find the coolie by coolieId
    const coolie = await Coolie.findById(coolieId);
    if (!coolie) {
      return res.status(404).json({ message: "Coolie not found." });
    }

    // Step 2: Fetch orders associated with the coolie
    const orders = await Order.find({ coolieId: coolieId })
      .populate("customerId", "firstName lastName phone", "User") // Populate full customer details (firstName, lastName, phoneNumber)
      .select(
        "id orderStatus totalWeight totalPrice pnrNumber trainNumber bags",
      ) // Include additional fields in the response
      .exec();

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this coolie." });
    }

    // Step 3: Separate orders into categories (accepted, completed, cancelled)
    const categorizedOrders = {
      acceptedOrders: [],
      completedOrders: [],
      cancelledOrders: [],
    };

    orders.forEach((order) => {
      const orderDetails = {
        orderId: order.id,
        pnrNo: order.pnrNumber,
        trainNo: order.trainNumber,
        bags: order.bags,
        status: order.orderStatus,
        weight: order.totalWeight,
        totalPrice: order.totalPrice,
        customer: order.customerId
          ? {
              firstName: order.customerId.firstName, // Populated customer first name
              lastName: order.customerId.lastName, // Populated customer last name
              phone: order.customerId.phone, // Populated customer phone number
            }
          : null,
      };

      console.log(orders);

      if (order.orderStatus === "accepted") {
        categorizedOrders.acceptedOrders.push(orderDetails);
      } else if (order.orderStatus === "completed") {
        categorizedOrders.completedOrders.push(orderDetails);
      } else if (order.orderStatus === "cancelled") {
        categorizedOrders.cancelledOrders.push(orderDetails);
      }
    });

    // Step 4: Send the categorized orders as the response
    return res.status(200).json(categorizedOrders);
  } catch (error) {
    console.error("Error fetching coolie orders:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching orders." });
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

    console.log(order);

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
