import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../common/errors";
import Payment from "../models/payment.model";
import { checkMongoDbId } from "../utils/checkMongoDbId";
import { createPaymentType, updatePaymentType } from "../validation/paymentSchema";
import Receipt from "../models/receipt.model";
export const createPaymentService = async (
    data: createPaymentType
) => {

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

export const updatePaymnetService = async (
    data: updatePaymentType
) => {
    const [userId, paymentId, bookingId] = checkMongoDbId([data.userId, data.paymentId, data.bookingId]);
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const payment = await Payment.findById(paymentId).session(session);
        const booking = await Booking.findById(bookingId).session(session);
        if (!payment || !booking) {
            throw new NotFoundError("Payment or Booking are not found.")
        }
        payment.status = "PAID";
        booking.status = "CONFIRMED";

        const receipt = await Receipt.create({
            receiptNo: "REC-" + Date.now(),
            userId,
            paymentId,
            bookingId,
            paymentMethod: payment.paymentMethod,
            status: payment.status,
            amount: payment.amount,
            paidAt: payment.paidAt,

        })
        session.commitTransaction();
        return { payment, receipt }
    } catch (error) {
        session.abortTransaction();
        throw error;
    } finally {
        session.endSession()
    }

}