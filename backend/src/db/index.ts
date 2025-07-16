import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();

const connectDB = async () => {
    try {
        // console.log("mongoUrl..",process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB