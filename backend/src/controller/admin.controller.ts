import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";
import { adminRegisterService } from "../service/auth.admin.service";

export const adminRegisterController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, access_token, refresh_token } = await adminRegisterService(req.validatedBody);
        res.cookie(
            "refreh_token",
            refresh_token,
            {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        )

        successResponse(
            res,
            201,
            "Account register successful.",
            {
                user,
                token: access_token
            }
        )

    } catch (error) {
        return next(error)
    }
}
export const adminLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, access_token, refresh_token } = await adminRegisterService(req.validatedBody);
        res.cookie(
            "refreh_token",
            refresh_token,
            {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        )

        successResponse(
            res,
            201,
            "Account register successful.",
            {
                user,
                token: access_token
            }
        )

    } catch (error) {
        return next(error)
    }
}
