import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";
import { createHotelService, deleteHotelService, getAllHotelsService, getHotelByIdService, updateHotelService } from "../service/hotel.service";

export const createHotelController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await createHotelService(req.validatedBody)

        successResponse(
            res,
            201,
            "Hotel created succefull.",
            { data }
        )
    } catch (error) {
        return next(error);
    }
}
export const updateHotelController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await updateHotelService(req.validatedParams, req.validatedBody)
        successResponse(
            res,
            201,
            "Hotel updated succefull.",
            { data }
        )
    } catch (error) {
        return next(error);
    }
}
export const deleteHotelController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await deleteHotelService(req.validatedParams);
        successResponse(
            res,
            200,
            "Hotel deleted succefull.",
            { data }
        )
    } catch (error) {
        return next(error);
    }
}
export const getHotelByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await getHotelByIdService(req.validatedParams);

        successResponse(
            res,
            201,
            "Get hotel by id succefull.",
            { data }
        )
    } catch (error) {
        return next(error);
    }
}
export const getAllHotelController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await getAllHotelsService()
        successResponse(
            res,
            201,
            "Hotel created succefull.",
            { data }
        )
    } catch (error) {
        return next(error);
    }
}
