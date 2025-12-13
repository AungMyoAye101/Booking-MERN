
import { createHotelController, deleteHotelController, getAllHotelController, getHotelByIdController, updateHotelController } from "../controller/hotel.controller";
import { validateRequestBody, validateRequestParams } from "../middleware/validation.middleware";
import { upload } from "../utils/cloudinary";
import { Router } from "express";
import { hotelSchema } from "../validation/hotelSchema";
import { IDSchema } from "../validation/authSchema";
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
    getAllHotelController);
router.get(
    '/:id',
    validateRequestParams(IDSchema),
    getHotelByIdController)
router.post(
    "/create",
    validateRequestBody(hotelSchema),
    createHotelController);
router.put(
    "/update/:id",
    validateRequestParams(IDSchema),
    validateRequestBody(hotelSchema),
    updateHotelController);
router.delete(
    '/delete/:id',
    validateRequestParams(IDSchema),
    deleteHotelController)

export default router;
