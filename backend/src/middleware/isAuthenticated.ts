import { Request, Response, NextFunction } from "express";
import { UnAuthorizedError } from "../common/errors";
import { verifyAccessToken } from "../common/jwt";

export const isAuthenticated = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; //get token "Barer token"
        if (!token) {
            throw new UnAuthorizedError("Your not authorized.");
        }
        const decoded = await verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return next(error)
    }
}