import { Router } from "express";
import { validateRequestBody } from "../middleware/validation.middleware";
import { bookingSchema } from "../validation/bookingSchema";
import { createBookingController } from "../controller/booking.controller";
import { hasRole } from "../middleware/isAuthenticated";

const router = Router();

// router.get('/')
router.post(
    "/create",
    validateRequestBody(bookingSchema),
    createBookingController
)
// router.put(
//     "/update/:id"
// )

export default router;