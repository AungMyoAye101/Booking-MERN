const express = require("express");
const {

  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,

  checkAvailability,
  getAllRoomsByHotelId,
} = require("../controller/room");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/:hotelId", getAllRoomsByHotelId);
router.get("/:roomId/available", checkAvailability)
router.post("/:hotelId", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id/:hotelId", deleteRoom);
router.get("/:id", getRoomById);



module.exports = router;
