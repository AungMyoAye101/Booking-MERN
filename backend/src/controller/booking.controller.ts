import { Request, Response } from "express";
import { asyncCatchFn } from "../utils/asyncFunction";
import { successResponse } from "../common/successResponse";
import { createBookingService } from "../service/booking.service";

export const createBookingController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = await createBookingService(req.validatedBody);
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