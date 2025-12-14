import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";
import { updateHotelImgService, uploadHotelImgService } from "../service/image.service";

export const hotelImageUploadController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const hotel = await uploadHotelImgService(req)
        successResponse(
            res,
            201,
            "Hotel image upload success.",
            { hotel }
        )
    } catch (error) {
        return next(error)
    }
}
export const hotelImageUpdateController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const hotel = await updateHotelImgService(req)
        successResponse(
            res,
            201,
            "Hotel image u success.",
            { hotel }
        )
    } catch (error) {
        return next(error)
    }
}
