import { Request } from "express";
import { bookingType } from "../validation/bookingSchema";
import Booking from "../models/booking.model";
import Room, { IRoom } from "../models/room.model";
import { BadRequestError } from "../common/errors";
import { checkMongoDbId } from "../utils/checkMongoDbId";

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
}
