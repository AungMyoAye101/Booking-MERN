import { Router } from "express";
import { validateRequestParams } from "../middleware/validation.middleware";
import { IDSchema } from "../validation/authSchema";
import upload from "../config/multer";
import { hotelImageUpdateController, hotelImageUploadController } from "../controller/image.controller";
import { hotelIdSchema } from "../validation/hotelSchema";

const router = Router();

router.post(
    '/upload/hotel/:id',
    upload.single("image"),
    validateRequestParams(IDSchema),
    hotelImageUploadController);

router.put(
    '/update/:imageId/hotel/:hotelId',
    upload.single("image"),
    validateRequestParams(hotelIdSchema),
    hotelImageUpdateController);
// router.delete('/remove/hotel/:id', validateRequestParams(IDSchema))
// router.post('/upload/room/:id', validateRequestParams(IDSchema))
// router.delete('/remove/room/:id', validateRequestParams(IDSchema))

export default router;