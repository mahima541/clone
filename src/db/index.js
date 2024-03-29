// import mongoose from "mongoose";
import mongodb from "mongodb";

// 
// db/index.js
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/info`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
