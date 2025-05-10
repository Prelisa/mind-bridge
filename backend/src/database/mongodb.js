import { connect } from "mongoose";

export async function connectMongoDB(uri) {
  try {
    console.log("Connecting to MongoDB cluster...");
    await connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    throw new Error(error);
  }
}
