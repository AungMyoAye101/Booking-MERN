import { BadRequestError, NotFoundError } from "../common/errors";
import { generateAccessToken, generateRefreshToken } from "../common/jwt";
import { comparedPassword, hashPassword } from "../common/password";
import User from "../models/user.model"
import { loginType, registerType } from "../validation/authSchema";

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