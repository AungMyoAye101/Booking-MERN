const express = require("express");
const Hotel = require("../models/hotel.model");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is hotel route");
});
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
