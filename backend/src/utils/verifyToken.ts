import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import { JWTPayloadType, RequestWithUser } from "../types";


const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
  return decoded

};

export const verifyUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).json("Your token is invalid!")
  };
  const user = verifyToken(token) as JWTPayloadType
  if (!user.id) {
    return res.status(400).json({ success: false, message: "You are not authorized!" })
  }

  req.user = user
  next()
}

export const verifyAdmin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).json("Your token is invalid!")
  };
  const user = verifyToken(token) as JWTPayloadType
  if (user.isAdmin === false) {
    return res.status(400).json({ success: false, message: "You are not allowed!" })
  }
  req.user = user as JWTPayloadType
  next()
};


