import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { bookingSchema, updateBookingSchema } from "../validation/bookingSchema";
import { createBookingController, getAllBookingByRoomIdController, updateBookingController } from "../controller/booking.controller";
import { hasRole } from "../middleware/isAuthenticated";
import { paginationSchmea } from "../validation/pagination";

const router = Router();

router.get(
    '/:roomId',
    checkMongoDBId(['roomId']),
    validateRequestQuery(paginationSchmea),
    getAllBookingByRoomIdController)
router.post(
    "/create",
    validateRequestBody(bookingSchema),
    createBookingController
)
router.put(
    "/update/:id",
    checkMongoDBId(['id']),
    validateRequestBody(updateBookingSchema),
    updateBookingController
)

export default router;