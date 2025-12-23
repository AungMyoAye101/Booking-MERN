import { Request, Response } from "express";
import { asyncCatchFn } from "../utils/asyncFunction";
import { successResponse } from "../common/successResponse";
import { getALlReceiptByUserIdService, getALlReceiptService } from "../service/receipt.service";

export const getAllReceiptController = asyncCatchFn(
    async (req: Request, res: Response) => {
        const data = await getALlReceiptService(req);
        successResponse(
            res,
            200,
            "Get All receipt.",
            { data }
        )
    }
)
export const getAllReceiptByUserIdController = asyncCatchFn(
    async (req: Request, res: Response) => {
        const data = await getALlReceiptByUserIdService(req);
        successResponse(
            res,
            200,
            "Get All receipt by user id.",
            { data }
        )
    }
)