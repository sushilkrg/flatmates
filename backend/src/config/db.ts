import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo-env", process.env.MONGO_URI);

    const DBConnection = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB connected: ${DBConnection?.connection?.host}`);
  } catch (error) {
    console.error(`Error while connecting to DB: ${error}`);
  }
};

export default connectDB;