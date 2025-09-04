import mongoose, { Document } from "mongoose"

export interface IBooking extends Document {
    user: string,
    room: string,
    roomNumber: number,
    totalPrice: number,
    checkIn: Date,
    checkOut: Date
}
const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    roomNumber: {
        type: Number,
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
    totalPrice: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Booking = mongoose.model<IBooking>("Booking", bookingSchema)
export default Booking