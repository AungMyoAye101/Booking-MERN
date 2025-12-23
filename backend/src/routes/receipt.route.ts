import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { paginationSchmea } from "../validation/pagination";
import { getAllReceiptByUserIdController, getAllReceiptController } from "../controller/receipt.controller";

const router = Router();

router.get(
    "/",
    validateRequestQuery(paginationSchmea),
    getAllReceiptController
)

router.get(
    "/:userId",
    checkMongoDBId(['userId']),
    validateRequestQuery(paginationSchmea),
    getAllReceiptByUserIdController
)

export default router;