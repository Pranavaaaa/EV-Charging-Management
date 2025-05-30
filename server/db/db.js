import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: "majority",
    });
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    process.exit(1);
  }
};

export default connectDB;