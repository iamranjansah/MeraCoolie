import User from "../models/UserModel.js";
import Coolie from "../models/CoolieModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid User ID",
      });
    }

    const user = await User.findById(userId).populate({
      path: "customerDetails.orders",
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
      orders: user.customerDetails.orders, // Orders related to this user
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

export const getCoolieProfile = async (req, res) => {
  try {
    const { coolieId } = req.params;

    if (!coolieId) {
      return res.status(400).json({
        success: false,
        message: "Coolie Id is required",
      });
    }

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
      phone: coolie.phone,
      role: coolie.role,
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

    if (!!updatedProfile) {
      return res.status(400).json({
        success: false,
        message: "Updated profile data is required",
      });
    }

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: updatedProfile,
      },
      { $new: true }
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
      { $new: true }
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
