const express = require("express");

const {
  getAllHotels,
  updateHotel,
  createHotel,
  deleteHotel,
  getHotelById,
  getHotelByType,
  getHotelByCity,
} = require("../controller/hotel");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken");
const router = express.Router();

router.get("/", getAllHotels);
router.post("/create-hotel", verifyToken, createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
router.get("/type/hotelType", getHotelByType)
router.get("/type/getHotelByCity", getHotelByCity)
// router.get("/:id", getHotelById);


module.exports = router;
