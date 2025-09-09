import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction, RequestHandler } from "express";
import { JWTPayloadType, RequestWithUser } from "../types";


const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY as string)
  return decoded

};

export const verifyUser: RequestHandler = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  if (!token) {
    res.status(401).json({ message: "Your token is invalid!" });
    return;
  };
  const user = verifyToken(token) as JWTPayloadType
  if (!user.id) {
    res.status(400).json({ success: false, message: "You are not authorized!" });
    return;
  }

  req.user = user
  next()
}

export const verifyAdmin = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { token } = req.cookies
  if (!token) {
    res.status(400).json("Your token is invalid!")
    return
  };
  const user = verifyToken(token) as JWTPayloadType
  if (user.isAdmin === false) {
    res.status(400).json({ success: false, message: "You are not allowed!" })
    return
  }
  req.user = user as JWTPayloadType
  next()
};


