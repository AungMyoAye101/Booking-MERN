const express = require("express");
const upload = require("../utils/upload");
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
router.post("/create-hotel", upload.array('photos', 5), createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
// router.get("/:id", getHotelById);

module.exports = router;
