import { Response } from "express";

export const successResponse = (
    res: Response,
    statusCode: number,
    message: string,
    result: any
) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        result
    })
}