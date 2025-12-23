import { BadRequestError } from "../common/errors";
import Payment from "../models/payment.model";
import { checkMongoDbId } from "../utils/checkMongoDbId";
import { createPaymentType } from "../validation/paymentSchema";

export const createPaymentService = async (
    data: createPaymentType
) => {
    console.log(data)
    const [userId, bookingId] = checkMongoDbId([data.userId, data.bookingId])
    const payment = await Payment.create({
        userId,
        bookingId,
        paymentMethod: data.paymentMethod,
        amount: data.amount,
        status: "PENDING"
    })
    if (!payment) {
        throw new BadRequestError("Failed to create payment.")
    }

    return payment;

}