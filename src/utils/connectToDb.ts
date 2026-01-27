import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config();
const db_url = process.env.MONGODB_URI as string;

export const connectToDb = async () => {
    try {
        if (!db_url) {
            console.error("MongoDb url is required.")
        }
        await mongoose.connect(db_url)
        console.log("MongoDb connected.")
    } catch (error) {
        throw new Error("Mongodb disconnect.")
    }
}