
import { NextFunction, Request, Response } from "express";
import { loginService, logoutService, refreshService, registerService } from "../service/auth.service";
import { successResponse } from "../common/successResponse";
import { genterateCookie } from "../common/generateCookie";

//Redister new user
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { user, access_token, refresh_token } = await registerService(req.validatedBody)

    genterateCookie(res, refresh_token)

    successResponse(res, 201, "User register successfull.", { user, token: access_token })
  } catch (error) {
    return next(error);
  }
};

//login
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    console.log(req.validatedBody)
    const { user, access_token, refresh_token } = await loginService(req.validatedBody)
    genterateCookie(res, refresh_token)
    successResponse(res, 200, "User login successfull.", { user, token: access_token })
  } catch (error) {
    return next(error)
  }
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await logoutService(req.user._id)
    res.clearCookie("refresh_token");
    successResponse(res, 200, "User logout successfull.", {})

  } catch (error) {
    return next(error)
  }
}

export const refeshController = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { user, access_token, refresh_token } = await refreshService(req);
    genterateCookie(res, refresh_token)
    successResponse(res, 200, "Token refresh successfull.", { user, token: access_token })
  } catch (error) {
    return next(error)
  }
}


