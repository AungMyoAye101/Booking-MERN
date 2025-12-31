import { Response } from "express";

export const successResponse = (
    res: Response,
    statusCode: number,
    message: string,
    result: any,
    meta?:{
        currentPage: number,
        hasNext:boolean,
        hasPrev:boolean,
        page:number,
        limit:number,
        total:number,
     
    }
) => {
    return res.status(statusCode).json({
        success:true,
        statusCode,
        message,
        result,
        meta
    })
}