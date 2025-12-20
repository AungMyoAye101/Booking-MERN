import { Request } from "express"
import User from "../models/user.model";
import { NotFoundError } from "../common/errors";
import { paginationResponseFormater } from "../utils/paginationResponse";
import { userType } from "../validation/userSchmea";

export const getAllUsersService = async (
    req: Request
) => {
    const { page = 1, limit = 10 } = req.validatedQuery;
    const skip = (page - 1) * limit;

    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    if (!users) {
        throw new NotFoundError("No user found.")
    }

    const total = await User.countDocuments();

    const meta = paginationResponseFormater(page, limit, total)

    return { users, meta }

}

export const getUserByIdService = async (
    userId: string
) => {
    console.log(userId);
    const user = await User.findById(userId).select("-password").lean();
    if (!user) {
        throw new NotFoundError("User not found.")
    }
    return user;
}
export const updateUserService = async (
    userId: string,
    data: userType
) => {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    console.log(user)
    if (!user) {
        throw new NotFoundError("User not found.")
    }

    return user;
}