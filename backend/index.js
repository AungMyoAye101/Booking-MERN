const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const hotelRouter = require("./routes/hotel");
const searchRouter = require("./routes/search");
const roomRouter = require("./routes/room");
const reviewRouter = require("./routes/review.route");
const bookingRouter = require("./routes/booking.route");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Hotel = require("./models/hotel.model");
const User = require("./models/user.model");
const cloudinary = require("cloudinary").v2
const { upload } = require("./utils/cloudinary")
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


app.post('/post', upload.array('photo', 4), async (req, res) => {
  console.log(req.files)
  if (!req.files) {
    return res.status(400).json({ message: "failed" })
  }
  const images = req.files.map(file => ({
    url: file.path,
    public_id: file.filename,
  }));
  console.log(images)
  res.status(200).json({ message: "success" })
})
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
app.get("/api/total", async (req, res) => {
  try {
    const hotelCount = await Hotel.countDocuments()
    const usersCount = await User.countDocuments()
    res.status(200).json({
      sucess: true, message: "successfull", data: {
        totalUsers: usersCount,
        totalHotels: hotelCount
      }
    })
  } catch (error) {
    res.status(500).json({ sucess: false, message: error.message })
  }
})

app.get('/', (req, res) => {
  res.send("Server is running on port 5000")
})

app.listen(port, () => {
  connectToDb();
  console.log("server is listening on port " + port);
});
