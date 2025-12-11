import { BadRequestError, NotFoundError } from "../common/errors";
import { generateAccessToken, generateRefreshToken } from "../common/jwt";
import { comparedPassword, hashPassword } from "../common/password";
import Admin from "../models/admin.model";
import { loginType, registerType } from "../validation/authSchema";


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