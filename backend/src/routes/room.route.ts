// import express from "express"
// import { checkAvailability, createRoom, deleteRoom, getAllRoomsByHotelId, getRoomById, updateRoom } from "../controller/room";

import { Router } from "express";
import { checkMongoDBId, validateRequestBody } from "../middleware/validation.middleware";
import { createRoomController, deleteRoomController, getAllRoomByHotelIdController, getRoomByIdController, updateRoomController } from "../controller/room.controller";
import { roomSchema } from "../validation/roomSchema";
import { hasRole, isAuthenticated } from "../middleware/isAuthenticated";


// const router = express.Router();

// router.get("/:hotelId", getAllRoomsByHotelId);
// router.get("/:roomId/available", checkAvailability)
// router.post("/:hotelId", createRoom);
// router.put("/:id", updateRoom);
// router.delete("/:id/:hotelId", deleteRoom);
// router.get("/:id", getRoomById);
// export default router;

const router = Router();

router.get(
    "/:hotelId",
    checkMongoDBId(["hotelId"]),
    getAllRoomByHotelIdController
);
router.get(
    "/:roomId",
    checkMongoDBId(["roomId"]),
    getRoomByIdController
);
router.post(
    "/:hotelId/create",
    isAuthenticated,
    hasRole(["admin", "staff"]),
    checkMongoDBId(["roomId"]),
    validateRequestBody(roomSchema),
    updateRoomController
)
router.delete(
    "/delete/:roomId",
    checkMongoDBId(["roomId"]),
    deleteRoomController
)



export default router;