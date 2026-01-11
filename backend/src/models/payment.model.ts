import mongoose, { Document, model, Types } from "mongoose";

export interface IPaymentType extends Document {
    bookingId: Types.ObjectId,
    userId: Types.ObjectId,
    paymentMethod: "MOBILE_BANKING" | "CARD" | "BANK",
    status: "PENDING" | "PAID" | "FAILED",
    amount: number,
    paidAt: Date
}


const paymentSchmea = new mongoose.Schema({
    bookingId: {
        type: Types.ObjectId,
        ref: "Booking",
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["MOBILE_BANKING", "CARD", "BANK"],
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "PAID", "FAILED"],
        required: true,
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: true,
    },
    paidAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

paymentSchmea.index({ status: 1, paidAt: 1 });
paymentSchmea.index({ createdAt: 1 })

const Payment = model<IPaymentType>("Payment", paymentSchmea);
export default Payment;