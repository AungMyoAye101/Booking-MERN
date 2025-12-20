import { Request } from "express"
import User from "../models/user.model";
import { NotFoundError } from "../common/errors";
import { paginationResponseFormater } from "../utils/paginationResponse";
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