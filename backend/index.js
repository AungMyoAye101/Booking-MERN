import express from "express";

const PORT = 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("hello Elizbeth Olsen");
});

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
