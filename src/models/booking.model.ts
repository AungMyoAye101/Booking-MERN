import mongoose, { Document, Types } from "mongoose"

export interface IBooking extends Document {
    userId: Types.ObjectId,
    roomId: Types.ObjectId,
    hotelId: Types.ObjectId,
    totalPrice: number,
    quantty: number,
    status: "PENDING" | "CONFIRMED" | "STAYED" | "CANCELLED" | "EXPIRED",
    checkIn: Date,
    checkOut: Date
}
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hotel",
        required: true,
    },
    checkIn: {
        type: Date,
        required: true,
    },
    checkOut: {
        type: Date,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "STAYED", "CANCELLED", "EXPIRED"]
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

// Compound index for room-specific booking queries (used in createBookingService)
bookingSchema.index({
    roomId: 1,
    checkIn: 1,
    checkOut: 1,
    status: 1
})

// Indexes for date range queries (used in getALlBookingsService)
// MongoDB can use these for efficient date range filtering
bookingSchema.index({ checkIn: 1, status: 1 })
bookingSchema.index({ checkOut: 1, status: 1 })
const Booking = mongoose.model<IBooking>("Booking", bookingSchema)
export default Booking