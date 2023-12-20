import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.set("strictQuery", false); // Add this line to address the deprecation warning
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
};

export default connect;
