import { Request, Response } from "express";
import { successResponse } from "../common/successResponse";
import { asyncCatchFn } from "../utils/asyncFunction";

export const getAllUsersController =
    asyncCatchFn(async (
        req: Request,
        res: Response,
    ) => {
        const data = "";
        successResponse(
            res,
            200,
            "Get all users success.",
            data
        )
    });
export const getUserByIdController =
    asyncCatchFn(async (
        req: Request,
        res: Response,
    ) => {
        const data = "";
        successResponse(
            res,
            200,
            "Get  user by id  success.",
            data
        )
    });