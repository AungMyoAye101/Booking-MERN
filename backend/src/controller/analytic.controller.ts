import { successResponse } from "../common/successResponse";
import { getTotalRevenueService } from "../service/analytic.service";
import { asyncCatchFn } from "../utils/asyncFunction";
import { Request, Response } from "express";
export const getTotalRevenueController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = await getTotalRevenueService()

        successResponse(
            res,
            200,
            "Get all payment total",
            data
        )
    }
)