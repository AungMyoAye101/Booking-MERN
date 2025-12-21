import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { paginationSchmea } from "../validation/pagination";
import { createReviewController, getReviewByHotelIDController, updateReviewController } from "../controller/review.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { reviewSchema } from "../validation/reviewSchema";

const router = Router();

router.get(
    "/:hotelId",
    checkMongoDBId(['hotelId']),
    validateRequestQuery(paginationSchmea),
    getReviewByHotelIDController
);
router.post(
    "/create",
    isAuthenticated,
    validateRequestBody(reviewSchema),
    createReviewController
)
router.put(
    "/update/:id",
    isAuthenticated,
    checkMongoDBId(['id']),
    validateRequestBody(reviewSchema),
    updateReviewController
)

export default router;