import { Router } from "express";
import {
    createPaymnetController,
    updatePaymnetController
} from "../controller/payment.controller";
import { validateRequestBody } from "../middleware/validation.middleware";
import { createPaymentSchema, updatePaymnetSchema } from "../validation/paymentSchema";

const router = Router();

router.post(
    "/create",
    validateRequestBody(createPaymentSchema),
    createPaymnetController,
)
router.put(
    "/update",
    validateRequestBody(updatePaymnetSchema),
    updatePaymnetController,
)

export default router;
