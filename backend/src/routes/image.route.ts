import { Router } from "express";
import { checkMongoDBId, validateRequestParams } from "../middleware/validation.middleware";
import { IDSchema } from "../validation/authSchema";
import upload from "../config/multer";
import { hotelImageUpdateController, hotelImageUploadController, roomImageUpdateController, roomImageUploadController } from "../controller/image.controller";
import { hotelIdSchema } from "../validation/hotelSchema";

const router = Router();

router.post(
    '/upload/hotel/:hotelId',
    checkMongoDBId(['hotelId']),
    upload.single("image"),
    hotelImageUploadController);

router.put(
    '/update/:imageId/hotel/:hotelId',
    checkMongoDBId(['imageId', 'hotelId']),
    upload.single("image"),
    hotelImageUpdateController);
router.post(
    '/upload/room/:roomId',
    checkMongoDBId(['roomId']),
    upload.single("image"),
    roomImageUploadController);

router.put(
    '/update/:imageId/hotel/:hotelId',
    upload.single("image"),
    checkMongoDBId(['imageId', 'roomId']),
    roomImageUpdateController);


export default router;