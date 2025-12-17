import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";

export const getAllUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        successResponse(
            res,
            200,
            "Get all users success.",
            {}
        )
    } catch (error) {
        return next(error)
    }
}
export const getUserByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        successResponse(
            res,
            200,
            "Get all users success.",
            {}
        )
    } catch (error) {
        return next(error)
    }
}