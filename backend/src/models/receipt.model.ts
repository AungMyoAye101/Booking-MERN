import { Document, model, Schema, Types } from "mongoose";

export interface IReceipt extends Document {
    receiptNo: string,
    userId: Types.ObjectId,
    paymentId: Types.ObjectId,
    bookingId: Types.ObjectId,
    status: "PAID" | "PENDING" | "FAUILED",
    paymentMethod: "MOBILE_BANKING" | "CARD" | "BANK",
    amount: number,
    paidAt: Date,
}

const receiptSchema = new Schema({
    receiptNo: {
        type: String,
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    bookingId: {
        type: Types.ObjectId,
        ref: "Booking",
        required: true
    },
    paymentId: {
        type: Types.ObjectId,
        ref: "Payment",
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
        default: Date.now()
    }
},
    { timestamps: true });

receiptSchema.index({ userId: 1 });
receiptSchema.index({ status: 1 });

const Receipt = model<IReceipt>("Receipt", receiptSchema);
export default Receipt;