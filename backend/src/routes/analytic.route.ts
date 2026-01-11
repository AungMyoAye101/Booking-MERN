import { Router } from "express";
import { getTotalBookingController, getTotalController, getTotalRevenueController } from "../controller/analytic.controller";

const router = Router();

router.get(
    '/dashboard/revenue',
    getTotalRevenueController
)
router.get(
    '/dashboard/total',
    getTotalController
)
router.get(
    '/dashboard/booking',
    getTotalBookingController
)

export default router;