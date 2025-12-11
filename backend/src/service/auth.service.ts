import { BadRequestError, NotFoundError } from "../common/errors";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../common/jwt";
import { comparedPassword, hashPassword } from "../common/password";
import User from "../models/user.model"
import { loginType, registerType } from "../validation/authSchema";
import { Request } from "express";

export const registerService = async (
    { name, email, password }: registerType
) => {
    const exitUser = await User.findOne({ email });
    if (exitUser) {
        throw new BadRequestError("User already exit.");
    }
    const hashed = await hashPassword(password);
    const user = new User({
        name,
        email,
        password: hashed
    })
    const access_token = await generateAccessToken({ id: user._id, email: user.email, role: null })
    const refresh_token = await generateRefreshToken({ id: user._id, email: user.email, role: null })

    user.token = refresh_token;
    await user.save();
    return { user, access_token, refresh_token }

}
export const loginService = async (
    { email, password }: loginType
) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError("User not found.")
    }
    const isMatch = await comparedPassword(password, user.password);
    if (!isMatch) {
        throw new BadRequestError("Invalid credential");
    }
    const access_token = await generateAccessToken({ id: user._id, email: user.email, role: null })
    const refresh_token = await generateRefreshToken({ id: user._id, email: user.email, role: null })

    user.token = refresh_token;
    await user.save();
    return {
        user, access_token, refresh_token
    }

}

export const logoutService = async (id: string) => {
    return await User.findByIdAndUpdate(id, {
        token: null
    })
}

export const refreshService = async (
    req: Request
) => {
    const token = req.cookies.refresh_token
    if (!token) {
        throw new BadRequestError("Token is required.")
    }
    const decoded = await verifyRefreshToken(token);

    const user = await User.findOne({ id: decoded._id })

    if (!user) {
        throw new NotFoundError("User not found.")
    }
    const access_token = generateAccessToken({
        id: user._id,
        email: user.email,
        role: null
    })
    const refresh_token = generateRefreshToken({
        id: user._id,
        email: user.email,
        role: null
    })
    user.token = refresh_token;
    return { user, access_token, refresh_token }
}

