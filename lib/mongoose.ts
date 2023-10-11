import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return console.log("=> using existing database connection");
  }

  if (!process.env.MONGODB_URL) {
    return console.log("=> no database uri found");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    isConnected = true;
    console.log("=> using new database connection");
  } catch (error) {
    console.log(error);
  }
};
