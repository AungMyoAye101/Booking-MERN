import express from "express"
import { checkAvailability, createRoom, deleteRoom, getAllRoomsByHotelId, getRoomById, updateRoom } from "../controller/room";


const router = express.Router();

router.get("/:hotelId", getAllRoomsByHotelId);
router.get("/:roomId/available", checkAvailability)
router.post("/:hotelId", createRoom);
router.put("/:id", updateRoom);
router.delete("/:id/:hotelId", deleteRoom);
router.get("/:id", getRoomById);
export default router;
