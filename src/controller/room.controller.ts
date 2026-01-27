import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";
import {
    createRoomService,
    deleteRoomService,
    getAllRoomsService,
    getRoomByIdService,
    getRoomsByHotelIdService,
    updateRoomService
} from "../service/room.service";
import { asyncCatchFn } from "../utils/asyncFunction";


export const createRoomController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const room = await createRoomService(req.validatedParams.hotelId, req.validatedBody);
        successResponse(
            res,
            201,
            "Room  created successfull.",
            { room }
        )
    } catch (error) {
        return next(error)
    }
}
export const updateRoomController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const room = await updateRoomService(req);
        successResponse(
            res,
            201,
            "Room  updated successfull.",
            { room }
        )
    } catch (error) {
        return next(error)
    }
}
export const deleteRoomController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const room = await deleteRoomService(req);
        successResponse(
            res,
            201,
            "Room  deleted successfull.",
            { room }
        )
    } catch (error) {
        return next(error)
    }
}
export const getAllRoomByHotelIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await getRoomsByHotelIdService(req);
        successResponse(
            res,
            200,
            "Room  get successfull.",
            data
        )
    } catch (error) {
        return next(error)
    }
}
export const getRoomByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const room = await getRoomByIdService(req.validatedParams.roomId);
        successResponse(
            res,
            200,
            "Room  get by id successfull.",
            { room }
        )
    } catch (error) {
        return next(error)
    }
}

export const getAllRoomsController = asyncCatchFn(
    async (
        req: Request,
        res: Response
    ) => {
        const data = await getAllRoomsService(req);
        successResponse(
            res,
            200,
            "Get all rooms successfull.",
            data
        )
    }
)