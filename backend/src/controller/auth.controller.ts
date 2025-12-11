
import { NextFunction, Request, Response } from "express";
import { loginService, logoutService, registerService } from "../service/auth.service";
import { successResponse } from "../common/successResponse";

//Redister new user
export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { user, access_token, refresh_token } = await registerService(req.validatedBody)

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

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

    const { user, access_token, refresh_token } = await loginService(req.validatedBody)
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
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


