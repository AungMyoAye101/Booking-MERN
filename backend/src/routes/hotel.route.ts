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
import { hotelSchema } from "../validation/hotelSchema";
import { hasRole, isAuthenticated } from "../middleware/isAuthenticated";
import { hotelSerachSchema } from "../validation/searchSchema";



const router = Router();

router.get(
    '/',
    validateRequestQuery(hotelSerachSchema),
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
    validateRequestBody(hotelSchema),
    updateHotelController);
router.delete(
    '/delete/:id',
    isAuthenticated,
    hasRole(['admin', 'staff']),
    checkMongoDBId(["id"]),
    deleteHotelController)

export default router;
