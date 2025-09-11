import express from "express"
import { Request, Response } from "express";
import { upload } from "../utils/cloudinary";
import { createHotel, deleteHotel, getAllHotels, getHotelByCity, getHotelById, getHotelByType, getSuggestion, hotelsByType, updateHotel } from "../controller/hotel";
import { UploadedFile } from "../types";
import { v2 } from "cloudinary";


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

router.post("/test/upload", upload.array("photos"), async (req: Request, res: Response) => {
    console.log("testing...")
    const photos = req.files as UploadedFile[];

    try {
        const uploaded = await Promise.all(photos.map(img => (
            v2.uploader.upload(img.path, { folder: "mern-images", })
        )))

        const photo = uploaded.map(img => ({ "secure_url": img.secure_url, "public_id": img.public_id }))

        res.status(200).json(photo)
    } catch (error) {
        res.status(500).json(error)
    }

})



export default router;
