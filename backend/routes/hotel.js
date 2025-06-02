const express = require("express");

const {
  getAllHotels,
  updateHotel,
  createHotel,
  deleteHotel,
  getHotelById,
  getHotelByType,
  getHotelByCity,
  hotelsByType,
} = require("../controller/hotel");

const router = express.Router();

router.get("/", getAllHotels);
router.post("/create-hotel", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
router.get("/type/hotelType", getHotelByType)
router.get("/type/getHotelByCity", getHotelByCity)
router.get("/type/:type", hotelsByType)



module.exports = router;
