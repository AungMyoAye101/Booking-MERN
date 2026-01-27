import { Request } from "express"
import User from "../models/user.model";
import { NotFoundError } from "../common/errors";
import { paginationResponseFormater } from "../utils/paginationResponse";
import { userQueryType, userType } from "../validation/userSchmea";

export const getAllUsersService = async (
    req: Request
) => {
    const { page = 1, limit = 10, search, sort = "desc" } = req.validatedQuery as userQueryType;
    const skip = (page - 1) * limit;
    const query: any = {};
    console.log(req.validatedQuery);
    if (search) {
        query.name = { $regex: search, $options: "i" }
    }
    const users = await User.find(query).sort({ createdAt: sort === "asc" ? 1 : -1 }).skip(skip).limit(limit).lean();

    const total = await User.countDocuments(query);

    const meta = paginationResponseFormater(page, limit, total)

    return { users, meta }

}

export const getUserByIdService = async (
    userId: string
) => {
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

    if (!user) {
        throw new NotFoundError("User not found.")
    }

    return user;
}