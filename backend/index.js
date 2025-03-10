const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const hotelRouter = require("./routes/hotel");
const roomRouter = require("./routes/room");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2
const app = express();

dotenv.config();
const port = process.env.PORT || 8080;
const DB_URI = process.env.MONGODB_URI;
const connectToDb = async () => {
  if (!DB_URI) {
    throw error("Mongodb uri is invalid");
  }
  try {
    await mongoose.connect(DB_URI);
    console.log("mongo db connected.");
  } catch (error) {
    throw error;
  }
};
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_api: process.env.CLOUDINARY_API_KEY,
  cloud_secret: process.env.CLOUDINARY_API_SECRET,
})
// DB connection error
mongoose.connection.on("disconnected", () => {
  console.log("Mongo DB is disconnected !");
});
app.get("/", (req, res) => {
  res.send("hello Elizbeth Olsen");
});

//Middleware for route handler
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}
));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);
app.use("/api/room", roomRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went worng!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(port, () => {
  connectToDb();
  console.log("server is listening on port " + port);
});
