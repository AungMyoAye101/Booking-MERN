// import express from "express"
// import { checkAvailability, createRoom, deleteRoom, getAllRoomsByHotelId, getRoomById, updateRoom } from "../controller/room";

import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { createRoomController, deleteRoomController, getAllRoomByHotelIdController, getRoomByIdController, updateRoomController } from "../controller/room.controller";
import { roomSchema } from "../validation/roomSchema";
import { hasRole, isAuthenticated } from "../middleware/isAuthenticated";
import { paginationSchmea } from "../validation/pagination";


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
    "/:roomId",
    checkMongoDBId(["roomId"]),
    getRoomByIdController
);
router.get(
    "/hotel/:hotelId",
    checkMongoDBId(["hotelId"]),
    validateRequestQuery(paginationSchmea),
    getAllRoomByHotelIdController
);
router.post(
    "/:hotelId/create",
    isAuthenticated,
    hasRole(["admin", "staff"]),
    checkMongoDBId(["hotelId"]),
    validateRequestBody(roomSchema),
    createRoomController
)
router.post(
    "/:hotelId/update",
    isAuthenticated,
    hasRole(["admin", "staff"]),
    checkMongoDBId(["hotelId"]),
    validateRequestBody(roomSchema),
    updateRoomController
)
router.delete(
    "/delete/:roomId",
    checkMongoDBId(["roomId"]),
    deleteRoomController
)



export default router;