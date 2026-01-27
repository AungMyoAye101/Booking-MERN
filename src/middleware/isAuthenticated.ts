import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnAuthorizedError } from "../common/errors";
import { verifyAccessToken } from "../common/jwt";
type roleType = "admin" | "staff";


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
        const decoded = verifyAccessToken(token);
        if (!decoded) {
            throw new UnAuthorizedError("Your not authorized.");
        }
        req.user = decoded;
        next();
    } catch (error) {
        return next(error)
    }
};

export const hasRole = (role: roleType[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!role.includes(req.user.role)) {
            throw new ForbiddenError("Your are not allowed.")
        }
        next();
    }
}