import { Router } from "express";
import { checkMongoDBId, validateRequestParams } from "../middleware/validation.middleware";
import upload from "../config/multer";
import { hotelImageUpdateController, hotelImageUploadController, roomImageUpdateController, roomImageUploadController } from "../controller/image.controller";


const router = Router();

router.post(
    '/upload/hotel/:hotelId',
    checkMongoDBId(['hotelId']),
    upload.single("image"),
    hotelImageUploadController);

router.put(
    '/update/hotel/:hotelId',
    checkMongoDBId(['hotelId']),
    upload.single("image"),
    hotelImageUpdateController);
router.post(
    '/upload/room/:roomId',
    checkMongoDBId(['roomId']),
    upload.single("image"),
    roomImageUploadController);

router.put(
    '/update/hotel/:hotelId',
    upload.single("image"),
    checkMongoDBId(['roomId']),
    roomImageUpdateController);


export default router;