const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is auth route");
});
router.get("/register", (req, res) => {
  res.send("This is register route");
});

module.exports = router;
