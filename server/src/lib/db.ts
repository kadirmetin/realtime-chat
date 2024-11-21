import mongoose, { MongooseError } from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`[DATABASE] MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE] ${(error as MongooseError).message}`);

    process.exit(1);
  }
};

export default connectDB;
