import { Router } from "express";
import { getTotalRevenueController } from "../controller/analytic.controller";

const router = Router();

router.get(
    '/revenue',
    getTotalRevenueController
)

export default router;