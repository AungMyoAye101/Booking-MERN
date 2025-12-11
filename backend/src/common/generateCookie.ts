import { Response } from "express"
const isproduction = process.env.NODE_ENV === "production";
export const genterateCookie = (
    res: Response,
    token: string
) => {
    res.cookie(
        "refresh_token",
        token,
        {
            httpOnly: true,
            sameSite: isproduction ? "lax" : "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        })
}