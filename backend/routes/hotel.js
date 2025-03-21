const express = require("express");

const {
  getAllHotels,
  updateHotel,
  createHotel,
  deleteHotel,
  getHotelById,
} = require("../controller/hotel");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken");
const router = express.Router();

router.get("/", getAllHotels);
router.post("/create-hotel", createHotel);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
// router.get("/:id", getHotelById);


module.exports = router;
