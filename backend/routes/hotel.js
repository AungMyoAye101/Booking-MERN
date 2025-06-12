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
const { upload } = require("../utils/cloudinary");

const router = express.Router();

router.get("/", getAllHotels);
router.post("/create-hotel", upload.array("images", 10), createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
router.get("/type/hotelType", getHotelByType)
router.get("/type/getHotelByCity", getHotelByCity)
router.get("/type/:type", hotelsByType)



module.exports = router;
