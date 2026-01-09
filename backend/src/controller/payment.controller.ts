import { Request, Response } from "express";
import { asyncCatchFn } from "../utils/asyncFunction";
import { successResponse } from "../common/successResponse";
import { ComfirmedPaymnetService, createPaymentService, getALlPaymentService, getPaymentById } from "../service/payment.service";

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
export const comfirmedPaymnetController = asyncCatchFn(
    async (req: Request, res: Response) => {
        const data = await ComfirmedPaymnetService(req.validatedBody)
        successResponse(
            res,
            201,
            "Payment updated successfull.",
            { data }
        )
    }
)

//get all payments

export const getAllPaymentController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {

        const data = await getALlPaymentService(req);

        successResponse(
            res,
            200,
            "Get all payment success.",
            data
        )
    }
)
export const getPaymentByIdController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const payment = await getPaymentById(req.validatedParams.id);
        successResponse(
            res,
            200,
            "Get payment by id success.",
            { payment }
        )
    }
)