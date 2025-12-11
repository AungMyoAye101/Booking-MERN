import { BadRequestError, NotFoundError } from "../common/errors";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../common/jwt";
import { comparedPassword, hashPassword } from "../common/password";
import Admin from "../models/admin.model";
import { loginType, registerType } from "../validation/authSchema";
import { Request } from "express";

export const adminRegisterService = async (
    { name, email, password }: registerType
) => {
    const exitingUser = await Admin.find({ email });
    if (exitingUser) {
        throw new BadRequestError("Email is already exit.")
    }
    const hashedPassword = await hashPassword(password);
    const user = new Admin({
        name,
        email,
        password: hashedPassword
    });
    const access_token = generateAccessToken({
        id: user._id,
        email: user.email,
        role: "admin"
    })
    const refresh_token = generateRefreshToken({
        id: user._id,
        email: user.email,
        role: "admin"
    })
    user.token = refresh_token;
    await user.save()
    return { user, access_token, refresh_token }
}
export const adminLoginService = async (
    { email, password }: loginType
) => {
    const user = await Admin.findOne({ email })
    if (!user) {
        throw new NotFoundError("Invalid email or paddword,")
    }
    const isMatch = await comparedPassword(user.password, password);
    if (!isMatch) {
        throw new BadRequestError("Invalid email or paddword,")
    }
    const access_token = generateAccessToken({
        id: user._id,
        email: user.email,
        role: "admin"
    })
    const refresh_token = generateRefreshToken({
        id: user._id,
        email: user.email,
        role: "admin"
    })
    user.token = refresh_token;
    await user.save()
    return { user, access_token, refresh_token }
}
export const adminLogoutService = async (id: string) => {
    return await Admin.findByIdAndUpdate(id, {
        token: null
    })
}

export const adminRefreshService = async (
    req: Request
) => {
    const token = req.cookies.refresh_token
    if (!token) {
        throw new BadRequestError("Token is required.")
    }
    const decoded = await verifyRefreshToken(token);
    const user = await Admin.findOne({ id: decoded._id })
    if (!user) {
        throw new NotFoundError("Admin not found.")
    }
    const access_token = generateAccessToken({
        id: user._id,
        email: user.email,
        role: "admin"
    })
    const refresh_token = generateRefreshToken({
        id: user._id,
        email: user.email,
        role: "admin"
    })
    user.token = refresh_token;
    return { user, access_token, refresh_token }
}