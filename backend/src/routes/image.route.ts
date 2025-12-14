import { Router } from "express";
import { validateRequestParams } from "../middleware/validation.middleware";
import { IDSchema } from "../validation/authSchema";
import upload from "../config/multer";
import { hotelImageUploadController } from "../controller/image.controller";

const router = Router();

router.post('/upload/hotel/:id', upload.single("image"), hotelImageUploadController)
// router.delete('/remove/hotel/:id', validateRequestParams(IDSchema))
// router.post('/upload/room/:id', validateRequestParams(IDSchema))
// router.delete('/remove/room/:id', validateRequestParams(IDSchema))

export default router;