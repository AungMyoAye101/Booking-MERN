const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const hotelRouter = require("./routes/hotel");
const roomRouter = require("./routes/room");
const { default: mongoose } = require("mongoose");
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
// DB connection error
mongoose.connection.on("disconnected", () => {
  console.log("Mongo DB is disconnected !");
});
app.get("/", (req, res) => {
  res.send("hello Elizbeth Olsen");
});

//Middleware for route handler
app.use(express.json);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/hotel", hotelRouter);
app.use("/room", roomRouter);
app.listen(port, () => {
  connectToDb();
  console.log("server is listening on port " + port);
});
