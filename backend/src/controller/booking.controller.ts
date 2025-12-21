import { Request, Response } from "express";
import { asyncCatchFn } from "../utils/asyncFunction";
import { successResponse } from "../common/successResponse";

export const bookingCreateController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = "";
        successResponse(
            res,
            201,
            "Booking created successful.",
            data
        )
    }
)
export const getAllBookingController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = "";
        successResponse(
            res,
            200,
            "Get all booking  successfull.",
            data
        )
    }
)