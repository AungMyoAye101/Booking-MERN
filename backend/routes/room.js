const express = require("express");
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
} = require("../controller/room");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getAllRooms);
router.post("/:hotelId", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id/:hotelId", deleteRoom);
router.get("/:id", getRoomById);

module.exports = router;
