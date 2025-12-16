
import {
    createHotelController,
    deleteHotelController,
    getAllHotelController,
    getHotelByIdController,
    updateHotelController
} from "../controller/hotel.controller";
import {
    checkMongoDBId,
    validateRequestBody,
    validateRequestParams,
    validateRequestQuery,
} from "../middleware/validation.middleware";
import { Router } from "express";
import { hotelSchema } from "../validation/hotelSchema";
import { IDSchema } from "../validation/authSchema";
import { paginationSchmea } from "../validation/pagination";
import { hasRole } from "../middleware/isAuthenticated";
// import {
//     createHotel,
//     deleteHotel,
//     getAllHotels,
//     getHotelByCity,
//     getHotelById,
//     getHotelByType,
//     getSuggestion,
//     hotelsByType,
//     updateHotel
// } from "../controller/hotel";

// const router = Router();

// router.get("/", getAllHotels);
// router.get("/suggestion", getSuggestion);
// router.post("/create-hotel", upload.array("photos", 4), createHotel);
// router.put("/:id", upload.array("photos", 4), updateHotel);
// router.delete("/:id", deleteHotel);
// router.get("/:id", getHotelById);
// router.get("/type/hotelType", getHotelByType)
// router.get("/type/getHotelByCity", getHotelByCity)
// router.get("/type/:type", hotelsByType)


const router = Router();

router.get(
    '/',
    validateRequestQuery(paginationSchmea),
    getAllHotelController);
router.get(
    '/:id',
    checkMongoDBId(["id"]),
    getHotelByIdController)
router.post(
    "/create",
    hasRole(['admin', 'staff']),
    validateRequestBody(hotelSchema),
    createHotelController);
router.put(
    "/update/:id",
    hasRole(['admin', 'staff']),
    checkMongoDBId(["id"]),
    validateRequestBody(hotelSchema),
    updateHotelController);
router.delete(
    '/delete/:id',
    hasRole(['admin', 'staff']),
    checkMongoDBId(["id"]),
    deleteHotelController)

export default router;
