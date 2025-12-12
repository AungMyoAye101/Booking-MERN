import mongoose from "mongoose";
import Booking, { IBooking } from "../models/booking.model";
import Room from "../models/room.model";
import { Request, Response } from "express";
import { BookingType } from "../types/type";

interface BookingRoomType {
    number: number,
    booking: {
        _id: string,
    }
}
export const bookingRoom = async (req: Request, res: Response) => {

    const { roomId, roomNumber, userId, checkIn, checkOut } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ sucess: false, message: "Room id is not valid" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "User id is not valid!" });
        }
        if (!checkIn || !checkOut) {
            return res.status(400).json({ success: false, message: "Checkin and CheckOut date are required." });
        }

        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        if (checkOutDate < checkInDate) {
            return res.status(400).json({ success: false, message: "CheckOut must be after checkIn date!" });
        }
        const hasConflict = await Booking.exists({
            room: roomId,
            roomNumber,

            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate }

        })

        if (hasConflict) {
            return res.status(400).json({ success: false, message: "This room is not available for this date." })
        }

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        const totalPrice = checkIn === checkOut ? room.price : (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24) * room.price

        const booking = await Booking.create({
            room: room._id, user: userId, roomNumber, checkIn, checkOut, totalPrice
        }) as unknown as BookingType
        if (!booking) {
            return res.status(400).json({ message: "Failed to create booking." })
        }
        const rn = room.roomNumbers.find(rn => rn.number === booking.roomNumber) as unknown as {
            number: number;
            booking: string[]
        }
        if (rn) {

            rn.booking.push(booking._id)
            await room.save()

        }

        return res.status(200).json({ success: true, message: "room booking successfull", data: booking })
    } catch (error) {
        if (error instanceof Error)
            console.log(error.message)
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}
export const myBooking = async (req: Request, res: Response) => {
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Userid is not valid!" })
    }

    try {
        const myBooking = await Booking.find({ user: userId }).populate("room", "title price _id")

        if (!myBooking || myBooking.length === 0) {
            return res.status(404).json({ success: false, message: "No Booking found" })
        }

        res.status(200).json({ success: true, message: "Booking data get successfully.", data: myBooking })
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ success: false, message: error.message })
    }
}


export const canceledBooking = async (req: Request, res: Response) => {
    const { userId, roomId, bookingId } = req.body
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ success: false, message: "Id is not valid" })
    }
    try {

        const booking = await Booking.findByIdAndDelete(bookingId)
        if (!booking) {
            return;
        }
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(400).json({ success: false, message: "RoomId is not valid" })
        }
        // Find the correct roomNumber object
        const rn = room.roomNumbers.find(rn => rn.number === booking.roomNumber);

        if (rn) {
            // Remove the booking entry (by matching checkIn/checkOut)
            rn.booking = rn.booking.filter(b =>
                b._id.toString() !== booking._id
            );
        }

        // Save the updated room
        await room.save();


        res.status(200).json({ success: true, message: "Your booking is canceled" })
    } catch (error) {
        if (error instanceof Error)
            console.log(error.message)
        res.status(500).json({ success: false, message: "Internal server Error" })
    }
}
