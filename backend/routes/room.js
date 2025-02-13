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
router.post("/:hotelId", verifyAdmin, createRoom);
router.put("/:id", verifyAdmin, updateRoom);
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
router.get("/:id", getRoomById);

module.exports = router;
