import { Request, Response } from "express";
import { successResponse } from "../common/successResponse";
import { asyncCatchFn } from "../utils/asyncFunction";
import {
    getAllUsersService,
    getUserByIdService,
    updateUserService
} from "../service/user.service";

export const getAllUsersController =
    asyncCatchFn(async (
        req: Request,
        res: Response,
    ) => {
        const data = await getAllUsersService(req);
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
        const data = await getUserByIdService(req.validatedParams.userId);
        successResponse(
            res,
            200,
            "Get  user by id  success.",
            data
        )
    });
export const updateUserController =
    asyncCatchFn(async (
        req: Request,
        res: Response,
    ) => {
        const data = await updateUserService(req.validatedParams.userId, req.validatedBody);
        successResponse(
            res,
            201,
            "Update  user by id  successful.",
            data
        )
    });