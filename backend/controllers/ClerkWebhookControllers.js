import { Webhook } from "svix"; // Import Svix package for webhook verification
import dotenv from "dotenv";
import User from "../models/UserModel.js"; // Assuming you have a Mongoose User model

dotenv.config(); // Load environment variables

// ClerkUserEvent function to handle webhook events
export const ClerkUserEvent = async (req, res) => {
  try {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET_KEY;

    console.log(SIGNING_SECRET);

    if (!SIGNING_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Error: Please add CLERK_WEBHOOK_SECRET_KEY to .env",
      });
    }

    // Create new Svix instance with secret
    const webhook = new Webhook(SIGNING_SECRET);

    // Get headers and body from the request
    const headers = req.headers;
    const payload = req.body;

    const payloadAsString = JSON.stringify(payload);

    const svix_id = headers["svix-id"]?.toString();
    const svix_timestamp = headers["svix-timestamp"]?.toString();
    const svix_signature = headers["svix-signature"]?.toString();

    // If any required header is missing, return error
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({
        success: false,
        message: "Error: Missing Svix headers",
      });
    }

    let event;

    // Attempt to verify the incoming webhook
    try {
      event = webhook.verify(payloadAsString, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.log("Error: Could not verify webhook:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Extract the event type and data from the payload
    const { id } = event.data;
    const eventType = event.type;

    // Handle different webhook event types
    switch (eventType) {
      case "user.created":
        // Create a new user in the database
        const newUser = new User({
          clerkId: event.data.id,
          firstName: event.data.first_name,
          lastName: event.data.last_name,
          email: event.data.email_addresses[0]?.email_address || "",
          phoneNumber: event.data.phone_numbers[0]?.phone_number || "",
        });

        try {
          await newUser.save();
          console.log(`User ${event.data.id} has been added to the database.`);
        } catch (error) {
          console.error(`Error saving user ${event.data.id}: ${error.message}`);
        }
        break;

      case "user.updated":
        // Update existing user in the database
        try {
          const updatedUser = await User.findOneAndUpdate(
            { clerkId: event.data.id },
            {
              $set: {
                firstName: event.data.first_name,
                lastName: event.data.last_name,
                email: event.data.email_addresses[0]?.email_address || "",
                phoneNumber: event.data.phone_numbers[0]?.phone_number || "",
              },
            },
            { new: true },
          );

          if (!updatedUser) {
            console.error(`User ${event.data.id} not found for update.`);
          } else {
            console.log(
              `User ${event.data.id} has been updated in the database.`,
            );
          }
        } catch (error) {
          console.error(
            `Error updating user ${event.data.id}: ${error.message}`,
          );
        }
        break;

      case "user.deleted":
        // Delete the user from the database
        try {
          const deletedUser = await User.findOneAndDelete({
            clerkId: event.data.id,
          });

          if (!deletedUser) {
            console.error(`User ${event.data.id} not found for deletion.`);
          } else {
            console.log(
              `User ${event.data.id} has been deleted from the database.`,
            );
          }
        } catch (error) {
          console.error(
            `Error deleting user ${event.data.id}: ${error.message}`,
          );
        }
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    // Send success response back to Clerk
    return res.status(200).json({
      success: true,
      message: "Webhook received and processed",
    });
  } catch (err) {
    console.error("Error processing webhook:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
