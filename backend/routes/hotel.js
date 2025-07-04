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
  getSuggestion,
} = require("../controller/hotel");
const { upload } = require("../utils/cloudinary");

const router = express.Router();

router.get("/", getAllHotels);
router.get("/suggestion", getSuggestion);
router.post("/create-hotel", upload.array("photos", 4), createHotel);
router.put("/:id", upload.array("photos", 4), updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
router.get("/type/hotelType", getHotelByType)
router.get("/type/getHotelByCity", getHotelByCity)
router.get("/type/:type", hotelsByType)



module.exports = router;
