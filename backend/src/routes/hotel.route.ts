import express from "express"

import { upload } from "../utils/cloudinary";
import { createHotel, deleteHotel, getAllHotels, getHotelByCity, getHotelById, getHotelByType, getSuggestion, hotelsByType, updateHotel } from "../controller/hotel";


// const { upload } = require("../utils/cloudinary");


const router = express.Router();

router.get("/", getAllHotels);
router.get("/suggestion", getSuggestion);
router.post("/create-hotel", upload.array("photos", 4), createHotel);
router.put("/:id", upload.array("photos", 4), updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotelById);
router.get("/type/hotelType", getHotelByType)
router.get("/type/getHotelByCity", getHotelByCity)
router.get("/type/:type", hotelsByType)



export default router;
