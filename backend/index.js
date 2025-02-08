const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("hello Elizbeth Olsen");
});
app.get("/name", (req, res) => {
  res.send(`<h1>Your name is Elizbeth </h1>`);
});
app.listen(port, () => {
  console.log("server is listening on port " + port);
});
