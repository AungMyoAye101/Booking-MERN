import express from "express"
import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import hotelRouter from "./routes/hotel.route";
import searchRouter from "./routes/search.route";
import roomRouter from "./routes/room.route";
import reviewRouter from "./routes/review.route"
import bookingRouter from "./routes/booking.route";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import cors from "cors"
import { Request, Response } from "express";
import Hotel from "./models/hotel.model";
import User from "./models/user.model";
const app = express();

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//Middleware for route handler
app.use(cookieParser());
app.use(cors({
  origin: process.env.ORIGIN_URL,
  credentials: true,
}
));

const port = process.env.PORT || 8080;
const DB_URI = process.env.MONGODB_URI;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



const connectToDb = async () => {
  if (!DB_URI) {
    throw new Error("Mongodb uri is invalid");
  }
  try {
    await mongoose.connect(DB_URI);
    console.log("mongo db connected.");
  } catch (error) {
    throw error;
  }
};


// DB connection error
mongoose.connection.on("disconnected", () => {
  console.log("Mongo DB is disconnected !");
});





app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/search", searchRouter);
app.use("/api/room", roomRouter);
app.use("/api/review", reviewRouter)
app.use("/api/booking", bookingRouter)
app.get("/api/total", async (req: Request, res: Response) => {
  try {
    const hotelCount = await Hotel.countDocuments()
    const usersCount = await User.countDocuments()
    res.status(200).json({
      success: true, message: "successful", data: {
        totalUsers: usersCount,
        totalHotels: hotelCount
      }
    })
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send("Server is running on port 5000")
})

app.listen(port, () => {
  connectToDb();
  console.log("server is listening on port " + port);
});
