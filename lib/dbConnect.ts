import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // console.log(process.env.MONGODB_URI);
  if (connection.isConnected) {
    console.log("Already Connect to database");
    return;
  }
  try {
    const db = await mongoose.connect(
      (process.env.MONGODB_URI as string) || "",
      {}
    );
    // console.log("db ready", db);
    // console.log("db connnections",db.connections)

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected Successfully");
  } catch (error) {
    console.log("Database Connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;