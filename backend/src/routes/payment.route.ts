import { Router } from "express";
import {
    comfirmedPaymnetController,
    createPaymnetController,
    getAllPaymentController,
    getPaymentByIdController,
} from "../controller/payment.controller";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { createPaymentSchema, paymentQuerySchema, updatePaymnetSchema } from "../validation/paymentSchema";
import { hasRole } from "../middleware/isAuthenticated";


const router = Router();

router.get(
    "/",
    hasRole(['admin', 'staff']),
    validateRequestQuery(paymentQuerySchema),
    getAllPaymentController
)
//get payment by id
router.get(
    "/:id",
    checkMongoDBId(["id"]),
    getPaymentByIdController
)

router.post(
    "/create",
    validateRequestBody(createPaymentSchema),
    createPaymnetController,
)
router.put(
    "/update",
    validateRequestBody(updatePaymnetSchema),
    comfirmedPaymnetController,
)

export default router;
