import { Request } from "express";
import Receipt from "../models/receipt.model";
import { NotFoundError } from "../common/errors";
import { paginationResponseFormater } from "../utils/paginationResponse";

export const getALlReceiptService = async (
    req: Request
) => {
    const { page = 1, limit = 10 } = req.validatedQuery;
    const skip = (page - 1) * limit;

    const receipts = await Receipt.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

    if (!receipts || receipts.length === 0) {
        throw new NotFoundError("Receipts are not found.")
    }

    const total = await Receipt.countDocuments();

    const meta = paginationResponseFormater(page, limit, total);

    return { receipts, meta }
}
export const getALlReceiptByUserIdService = async (
    req: Request
) => {
    const { page = 1, limit = 10 } = req.validatedQuery;
    const { userId } = req.validatedParams;
    const skip = (page - 1) * limit;

    const receipts = await Receipt.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

    if (!receipts || receipts.length === 0) {
        throw new NotFoundError("Receipts are not found.")
    }

    const total = await Receipt.countDocuments({ userId });

    const meta = paginationResponseFormater(page, limit, total);

    return { receipts, meta }
}