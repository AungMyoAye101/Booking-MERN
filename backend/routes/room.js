const express = require("express");
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
} = require("../controller/room");

const router = express.Router();

router.get("/", getAllRooms);
router.post("/:hotelId", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/:id", getRoomById);

module.exports = router;
