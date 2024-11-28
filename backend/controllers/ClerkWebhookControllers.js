import { Webhook } from "@clerk/clerk-sdk-node"; // Import Clerk SDK for webhooks
import dotenv from "dotenv"; // dotenv for loading environment variables
import User from "./models/User"; // Assuming you have a User model

dotenv.config(); // Load environment variables

export const ClerkUserEvent = async (req, res) => {
  try {
    const payloadString = req.body.toString(); // Parse the incoming payload as string
    const svixHeaders = req.headers; // Headers sent by Clerk for verification

    // Initialize Clerk Webhook and verify the request using the secret key
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY); // Ensure you have set this in .env
    const evt = wh.verify(payloadString, svixHeaders); // Verify the payload

    const { id, ...attributes } = evt.data; // Extract user ID and data attributes
    const eventType = evt.type; // Get the event type (user.created, user.updated, etc.)

    switch (eventType) {
      case "user.created":
        // Create a new user in your database
        const newUser = new User({
          clerkId: id, // Assuming 'clerkId' is a field in your User model
          firstName: attributes.first_name,
          lastName: attributes.last_name,
          email: attributes.email_address,
          phoneNumber: attributes.phone_number,
          // Add any other necessary fields
        });

        // Save the new user to the database
        await newUser.save();
        console.log(`User ${id} has been added to the database`);

        break;

      case "user.updated":
        // Find the user by Clerk ID and update the user in your database
        const updatedUser = await User.findOneAndUpdate(
          { clerkId: id }, // Search by Clerk ID
          {
            $set: {
              firstName: attributes.first_name,
              lastName: attributes.last_name,
              email: attributes.email_address,
              phoneNumber: attributes.phone_number,
              // Update any other fields that have changed
            },
          },
          { new: true } // Return the updated document
        );

        if (!updatedUser) {
          console.error(`User ${id} not found for update`);
        } else {
          console.log(`User ${id} has been updated`);
        }

        break;

      case "user.deleted":
        // Delete the user from the database based on Clerk ID
        const deletedUser = await User.findOneAndDelete({ clerkId: id });

        if (!deletedUser) {
          console.error(`User ${id} not found for deletion`);
        } else {
          console.log(`User ${id} has been deleted from the database`);
        }

        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    // Send a success response back to Clerk
    res.status(200).json({
      success: true,
      message: "Webhook received successfully",
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
