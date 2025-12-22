import { Request } from "express";
import { bookingType, updateBookingType } from "../validation/bookingSchema";
import Booking from "../models/booking.model";
import Room, { IRoom } from "../models/room.model";
import { BadRequestError, NotFoundError } from "../common/errors";
import { checkMongoDbId } from "../utils/checkMongoDbId";
import { paginationResponseFormater } from "../utils/paginationResponse";

export const createBookingService = async (
    data: bookingType
) => {
    const [roomId] = checkMongoDbId([data.roomId]);

    const booked = await Booking.aggregate([
        {
            $match: {
                roomId,
                status: { $in: ['PENDING', 'CONFRIMED'] },
                checkIn: { $lt: new Date(data.checkOut) },
                checkOut: { $gt: new Date(data.checkIn) },
            }
        },
        {
            $group: {
                _id: null,
                bookedCount: { $sum: "$quantity" }
            }
        }
    ])

    const bookedCount = booked.length > 0 ? booked[0].bookedCount : 0;
    const room = await Room.findById(data.roomId) as IRoom;
    if (room.totalRooms - bookedCount < data.quantity) {
        throw new BadRequestError("Failed to book this room.");
    }
    const booking = await Booking.create(data);

    return booking;
};

export const updateBookingService = async (
    id: string,
    data: updateBookingType
) => {
    const booking = await Booking.findByIdAndUpdate(id, data, { new: true })
    if (!booking) {
        throw new NotFoundError("Booking not found.")
    }
    return booking;
}
export const getAllBookingByRoomIdService = async (
    req: Request

) => {
    const { roomId } = req.validatedParams;

    const { page = 1, limit = 10 } = req.validatedQuery;
    //skip amount 
    const skip = (page - 1) * limit;
    const bookings = await Booking.find({ roomId })
        .sort({ createdAt: -1 }).skip(skip).limit(10).lean()
    if (!bookings) {
        throw new NotFoundError("Booking not found.")
    }
    const total = await Booking.countDocuments({ roomId });

    const meta = paginationResponseFormater(page, limit, total)
    return { bookings, meta };
}
