import { Request } from "express";
import { bookingType } from "../validation/bookingSchema";
import Booking from "../models/booking.model";
import Room, { IRoom } from "../models/room.model";
import { BadRequestError } from "../common/errors";

export const createBookingService = async (
    data: bookingType
) => {

    const booked = await Booking.aggregate([
        {
            $match: {
                roomId: data.roomId,
                status: { $in: ['PENDING', 'CONFRIMED'] },
                $expr: {
                    $and: [
                        { $lt: ["$checkIn", data.checkOut] },
                        { $gt: ['$checkOut', data.checkIn] }
                    ]
                }
            }
        },
        {
            $group: {
                _id: null,
                bookedCount: { $sum: "$quantity" }
            }
        }
    ])

    console.log(booked, "booked");
    const bookedCount = booked[0].bookedCount || 0;

    const room = await Room.findById(data.roomId) as IRoom;
    if (room.totalRooms - bookedCount < data.quantity) {
        throw new BadRequestError("Failed to book this room.");
    }
    const booking = await Booking.create(data);

    return booking;
}