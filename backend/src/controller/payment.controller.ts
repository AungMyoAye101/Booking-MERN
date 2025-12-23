import { Request, Response } from "express";
import { asyncCatchFn } from "../utils/asyncFunction";
import { successResponse } from "../common/successResponse";
import { createPaymentService, updatePaymnetService } from "../service/payment.service";

export const createPaymnetController = asyncCatchFn(
    async (req: Request, res: Response) => {
        const payment = await createPaymentService(req.validatedBody);
        successResponse(
            res,
            201,
            "Payment created successfull.",
            { payment }
        )
    }
)
export const updatePaymnetController = asyncCatchFn(
    async (req: Request, res: Response) => {
        const data = await updatePaymnetService(req.validatedBody)
        successResponse(
            res,
            201,
            "Payment updated successfull.",
            { data }
        )
    }
)