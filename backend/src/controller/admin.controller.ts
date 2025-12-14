import { Request, Response, NextFunction } from "express";
import { successResponse } from "../common/successResponse";
import { adminLoginService, adminLogoutService, adminRefreshService, adminRegisterService } from "../service/auth.admin.service";
import { genterateCookie } from "../common/generateCookie";

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
        const { user, access_token, refresh_token } = await adminLoginService(req.validatedBody);
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

export const adminLogoutController = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        await adminLogoutService(req.user._id)
        res.clearCookie("refresh_token");
        successResponse(res, 200, "Admin logout successfull.", {})

    } catch (error) {
        return next(error)
    }
}
export const refrehTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const { user, access_token, refresh_token } = await adminRefreshService(req);
        genterateCookie(res, refresh_token);
        successResponse(res, 200, "Token refresh successfull.", { user, token: access_token })

    } catch (error) {
        return next(error)
    }
}
