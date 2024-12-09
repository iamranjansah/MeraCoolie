import User from "../models/UserModel.js";
import Coolie from "../models/CoolieModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid User ID",
      });
    }

    const user = await User.findOne({ clerkId: userId }).populate({
      path: "orderDetails.orders",
      model: "Order",
    });

    if (!user) {
      return res.status(404).json({
        succcess: false,
        message: "User not found",
      });
    }

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      orders: user.orderDetails.orders, // Orders related to this user
    };

    res.status(200).json({
      success: true,
      message: "User Profile fetched successfully",
      userProfile,
    });
  } catch (error) {
    console.log("Error fetching User Profile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const registerCoolie = async (req, res) => {
  try {
    const {
      email,
      password,
      phone,
      firstName,
      lastName,
      location,
      assignedStation,
    } = req.body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phone ||
      !location ||
      !assignedStation
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    console.log(req.body);

    // Check if the email is already registered
    const existingCoolie = await Coolie.findOne({ email });
    if (existingCoolie) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Create a new Coolie
    const coolie = new Coolie({
      email,
      password,
      firstName,
      lastName,
      phoneNumber: phone,
      assignedStation,
      coolieLocation: location,
    });
    await coolie.save();

    res.status(201).json({
      success: true,
      message: "Coolie registered successfully",
      coolie,
      id: coolie._id,
    });
  } catch (error) {
    console.error("Error registering Coolie:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginCoolie = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the Coolie exists
    const coolie = await Coolie.findOne({ email });
    if (!coolie) {
      return res.status(404).json({
        success: false,
        message: "Coolie not found",
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, coolie.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token, including the role
    const token = jwt.sign(
      { id: coolie._id, role: "coolie" }, // Include the role in the payload
      "your_secret_key",
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      message: "Coolie logged in successfully",
      token,
      coolieId: coolie._id, // Send the coolieId along with the token
    });
  } catch (error) {
    console.error("Error logging in Coolie:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCoolieProfile = async (req, res) => {
  try {
    const { coolieId } = req.params;

    if (!coolieId) {
      return res.status(400).json({
        success: false,
        message: "Coolie Id is required",
      });
    }

    console.log(coolieId);

    const coolie = await Coolie.findById(coolieId).populate({
      // Orders related to Coolie
      path: "orders",
      model: "Order",
    });

    if (!coolie) {
      res.status(404).json({
        success: false,
        message: "Coolie Profile not found",
      });
    }

    const coolieProfile = {
      firstName: coolie.firstName,
      lastName: coolie.lastName,
      email: coolie.email,
      phone: coolie.phoneNumber,
      role: coolie.role,
      coolieLocation: coolie.coolieLocation,
      assignedStation: coolie.assignedStation,
      coolieStatus: coolie.status,
      // Orders related to this coolie
      orders: coolie.orders,
    };

    res.status(200).json({
      success: true,
      message: "Coolie Profile fetched successfully",
      coolieProfile,
    });
  } catch (error) {
    console.log("Error fetching coolie profile: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCoolieMonthlyEarnings = async (req, res) => {
  const { coolieId } = req.params;

  if (!coolieId) {
    return res.status(400).json({
      success: false,
      message: "CoolieId is required",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const { updatedProfile } = req.body;

    console.log(updatedProfile);

    if (!updatedProfile) {
      return res.status(400).json({
        success: false,
        message: "Updated profile data is required",
      });
    }

    // Find the user by userId
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $set: updatedProfile,
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "User Details updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Error updating User Details: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const updateUserPhoneNumber = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        $id: userId,
      },
      {
        $set: { phone: phoneNumber },
      },
      {
        $new: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Phone Number updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Error updating Phone number: ", error);
    res.status();
  }
};

export const updateCoolieProfile = async (req, res) => {
  try {
    const { coolieId } = req.params;

    if (!coolieId) {
      return res.status(400).json({
        success: false,
        message: "Coolie Id is required",
      });
    }

    const { updatedProfile } = req.body;

    if (!updatedProfile) {
      return res.status(400).json({
        success: false,
        message: "Updated profile data is required",
      });
    }

    console.log(updatedProfile);

    // Find the user by userId
    const coolie = await Coolie.findById(coolieId);

    if (!coolie) {
      return res.status(404).json({
        success: false,
        message: "Coolie not found",
      });
    }

    const updatedCoolie = await Coolie.findByIdAndUpdate(
      coolieId,
      {
        $set: updatedProfile,
      },
      { $new: true },
    );

    res.status(200).json({
      success: true,
      message: "User Details updated successfully",
      updatedCoolie,
    });
  } catch (error) {
    console.log("Error updating User Details: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const updateCoolieStatus = async (req, res) => {
  const { coolieId } = req.params;

  try {
    // Find the coolie by coolieId
    const coolie = await Coolie.findById(coolieId);
    if (!coolie) {
      return res.status(404).json({ message: "Coolie not found" });
    }

    // Update coolie status to 'active'
    coolie.status = "active";

    // Save the updated coolie
    const updatedCoolie = await coolie.save();

    // Send response with updated coolie details
    res.status(200).json({
      message: "Coolie status updated to active",
      coolie: updatedCoolie,
    });
  } catch (error) {
    console.error("Error updating coolie status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
