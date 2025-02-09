const express = require("express");
const Hotel = require("../models/hotel.model");
const { getAllHotels } = require("../controller/hotel");
const router = express.Router();

router.get("/", getAllHotels);
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
