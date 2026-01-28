import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { bookingQuerySchema, bookingSchema, updateBookingSchema } from "../validation/bookingSchema";
import { createBookingController, getAllBookingByRoomIdController, getAllBookingsController, getBookingByIdController, updateBookingController } from "../controller/booking.controller";
import { hasRole } from "../middleware/isAuthenticated";
import { paginationSchmea } from "../validation/pagination";

const router: Router = Router();

router.get(
    '/',
    hasRole(['admin', 'staff']),
    validateRequestQuery(bookingQuerySchema),
    getAllBookingsController);
router.get(
    '/:bookingId',
    checkMongoDBId(['bookingId']),
    getBookingByIdController);
router.get(
    '/room/:roomId',
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