import {
    createHotelController,
    deleteHotelController,
    getAllHotelController,
    getHotelByIdController,
    getHotelByTypesController,
    updateHotelController
} from "../controller/hotel.controller";
import {
    checkMongoDBId,
    validateRequestBody,
    validateRequestQuery,
} from "../middleware/validation.middleware";
import { Router } from "express";
import { hotelSchema, hotelUpdateSchema } from "../validation/hotelSchema";
import { hasRole, isAuthenticated } from "../middleware/isAuthenticated";
import { HotelQuerySchema } from "../validation/searchSchema";



const router = Router();

router.get(
    '/',
    validateRequestQuery(HotelQuerySchema),
    getAllHotelController
);

router.get(
    '/types',
    getHotelByTypesController)
router.get(
    '/:id',
    checkMongoDBId(["id"]),
    getHotelByIdController);

router.post(
    "/create",
    isAuthenticated,
    hasRole(['admin', 'staff']),
    validateRequestBody(hotelSchema),
    createHotelController);
router.put(
    "/update/:id",
    isAuthenticated,
    hasRole(['admin', 'staff']),
    checkMongoDBId(["id"]),
    validateRequestBody(hotelUpdateSchema),
    updateHotelController);
router.delete(
    '/delete/:id',
    isAuthenticated,
    hasRole(['admin', 'staff']),
    checkMongoDBId(["id"]),
    deleteHotelController)

export default router;
