import { Request } from "express";
import { bookingType } from "../validation/bookingSchema";
import Booking from "../models/booking.model";

export const createBookingService = async (
    data: bookingType
) => {
    const conflit = await Booking.find({
        roomId: data.roomId,

    })
}