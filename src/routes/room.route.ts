// import express from "express"
// import { checkAvailability, createRoom, deleteRoom, getAllRoomsByHotelId, getRoomById, updateRoom } from "../controller/room";

import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import {
    createRoomController,
    deleteRoomController,
    getAllRoomByHotelIdController,
    getAllRoomsController,
    getRoomByIdController,
    updateRoomController
} from "../controller/room.controller";
import { avaliableRoomSchema, roomSchema } from "../validation/roomSchema";
import { hasRole, isAuthenticated } from "../middleware/isAuthenticated";
import { paginationSchmea } from "../validation/pagination";



const router: Router = Router();

router.get(
    "/",
    validateRequestQuery(paginationSchmea),
    getAllRoomsController
)

router.get(
    "/:roomId",
    checkMongoDBId(["roomId"]),
    getRoomByIdController
);
router.get(
    "/hotel/:hotelId",
    checkMongoDBId(["hotelId"]),
    validateRequestQuery(avaliableRoomSchema),
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
router.put(
    "/update/:roomId",
    checkMongoDBId(["roomId"]),
    isAuthenticated,
    hasRole(["admin", "staff"]),
    validateRequestBody(roomSchema),
    updateRoomController
)
router.delete(
    "/delete/:roomId",
    checkMongoDBId(["roomId"]),
    deleteRoomController
)



export default router;