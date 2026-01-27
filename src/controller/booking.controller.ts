import { Request, Response } from "express";
import { asyncCatchFn } from "../utils/asyncFunction";
import { successResponse } from "../common/successResponse";
import { createBookingService, getAllBookingByRoomIdService, getALlBookingsService, getBookingById, updateBookingService } from "../service/booking.service";

export const createBookingController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const booking = await createBookingService(req.validatedBody);
        successResponse(
            res,
            201,
            "Booking created successful.",
            { booking }
        )
    }
)
export const updateBookingController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {

        const booking = await updateBookingService(req.validatedParams.id, req.validatedBody);
        successResponse(
            res,
            201,
            "Booking updated successfull.",
            { booking }
        )
    }
)
export const getAllBookingByRoomIdController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = await getAllBookingByRoomIdService(req);
        successResponse(
            res,
            200,
            "Get all booking  successfull.",
            data
        )
    }
)

export const getAllBookingsController = asyncCatchFn(
    async (
        req: Request,
        res: Response,
    ) => {
        const data = await getALlBookingsService(req);

        successResponse(
            res,
            200,
            "Get all booking success.",
            data
        )
    }
)

export const getBookingByIdController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const booking = await getBookingById(req.validatedParams.bookingId);
        successResponse(
            res,
            200,
            "Get  booking success.",
            { booking }
        )
    }
)