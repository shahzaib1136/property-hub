import mongoose from "mongoose";

let isConnected = false; // Track connection state to avoid reconnecting

const connectDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true); // Enforce strict query behavior

  // Avoid multiple connections
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string); // Use only valid options
    isConnected = true;

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Throw the error for further handling if needed
  }
};

export default connectDB;
