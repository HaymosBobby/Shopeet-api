import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to MongoDB");
};

export default dbConnect;
