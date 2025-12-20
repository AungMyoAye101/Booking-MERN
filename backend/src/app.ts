import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { limiter } from "./utils/limiter";
import { errorHandler } from "./middleware/errorHandler.middleware";
//routers 
import adminRouter from "./routes/admin.auth.route";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import hotelRouter from "./routes/hotel.route";
import searchRouter from "./routes/search.route";
import roomRouter from "./routes/room.route";
import reviewRouter from "./routes/review.route";
import bookingRouter from "./routes/booking.route";
import imageRouter from "./routes/image.route";
import { isAuthenticated } from "./middleware/isAuthenticated";


const app = express();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//Middleware for route handler
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
}
));
app.use(limiter);

//roures
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/hotel", isAuthenticated, hotelRouter);
app.use("/api/v1/image", imageRouter)
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/review", reviewRouter)
app.use("/api/v1/booking", bookingRouter)

//error handler middleware.
app.use(errorHandler);


export default app;
