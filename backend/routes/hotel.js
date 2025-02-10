const express = require("express");
const Hotel = require("../models/hotel.model");
const {
  getAllHotels,
  updateHotel,
  createHotel,
  deleteHotel,
  getHotelById,
} = require("../controller/hotel");
const router = express.Router();

router.get("/", getAllHotels);
router.post("/", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);

module.exports = router;
