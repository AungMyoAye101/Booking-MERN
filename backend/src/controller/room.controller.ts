import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";
import {
    createRoomService,
    deleteRoomService,
    getRoomByIdService,
    getRoomsByHotelIdService,
    updateRoomService
} from "../service/room.service";


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
        const data = await updateRoomService(req);
        successResponse(
            res,
            201,
            "Room  updated successfull.",
            { data }
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
        const data = await deleteRoomService(req);
        successResponse(
            res,
            201,
            "Room  deleted successfull.",
            { data }
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
        const data = await getRoomsByHotelIdService(req.validatedParams.hotelId);
        successResponse(
            res,
            20,
            "Room  get successfull.",
            { data }
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
        const data = await getRoomByIdService(req.validatedParams.id);
        successResponse(
            res,
            20,
            "Room  get by id successfull.",
            { data }
        )
    } catch (error) {
        return next(error)
    }
}