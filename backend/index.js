const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hello Elizbeth Olsen");
});

app.use("/auth", authRouter);
app.listen(port, () => {
  console.log("server is listening on port " + port);
});
