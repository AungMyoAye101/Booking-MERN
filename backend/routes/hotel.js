const express = require("express");
const Hotel = require("../models/hotel.model");
const {
  getAllHotels,
  updateHotel,
  createHotel,
  deleteHotel,
  getHotelById,
} = require("../controller/hotel");
const { verifyAdmin } = require("../utils/verifyToken");
const router = express.Router();

router.get("/", getAllHotels);
router.post("/", verifyAdmin, createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/:id", getHotelById);
// router.get("/:id", getHotelById);

module.exports = router;
