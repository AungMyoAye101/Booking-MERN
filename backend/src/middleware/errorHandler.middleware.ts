import { Request, Response, NextFunction } from "express";
import { CustomError, ValidationError } from "../common/errors";

export const errorHandler = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            status: err.statusCode,
            error: err.generateErrors()
        })
    } else if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            status: err.statusCode,

        })
    } else {
        return res.status(500).json({
            success: false,
            message: err.message || "Something worng.",
            status: 500,

        })
    }
}