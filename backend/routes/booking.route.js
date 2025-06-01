const express = require("express")
const { default: mongoose } = require("mongoose")
const Booking = require("../models/booking.model")
const Room = require("../models/room.model")
const router = express.Router()

router.post('/', async (req, res) => {

    const { roomId, roomNumber, userId, checkIn, checkOut } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ sucess: false, message: "Room id is not valid" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "User id is not valid!" });
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

        const totalPrice = checkIn === checkOut ? room.price : (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) * room.price




        const booking = await Booking.create({
            room: room._id, user: userId, roomNumber, checkIn, checkOut, totalPrice
        })
        const rn = room.roomNumbers.find(rn => rn.number === booking.roomNumber)
        if (rn) {
            rn.booking.push(booking._id)
            await room.save()
        }

        return res.status(200).json({ success: true, message: "room booking successfull", data: booking })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message });
    }
})
router.get('/mybooking/:userId', async (req, res) => {
    const { userId } = req.params
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Userid is not valid!" })
    }

    try {
        const myBooking = await Booking.find({ user: userId }).populate("room", "title price _id")

        if (!myBooking && myBooking.length <= 0) {
            return res.status(404).json({ success: false, message: "No Booking found" })
        }

        res.status(200).json({ success: true, message: "Booking data get successfully.", data: myBooking })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})


router.post('/cancel-booking', async (req, res) => {
    const { userId, roomId, bookingId } = req.body
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ success: false, message: "Id is not valid" })
    }
    try {

        const booking = await Booking.findByIdAndDelete(bookingId)
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(400).json({ success: false, message: "RoomId is not valid" })
        }



        // Find the correct roomNumber object
        const rn = room.roomNumbers.find(rn => rn.number === booking.roomNumber);
        if (rn) {
            // Remove the booking entry (by matching checkIn/checkOut)
            rn.booking = rn.booking.filter(b =>
                String(new Date(b.checkIn)) !== String(new Date(booking.checkIn)) ||
                String(new Date(b.checkOut)) !== String(new Date(booking.checkOut))
            );
        }
        console.log(rn)
        // Save the updated room
        await room.save();

        res.status(200).json({ success: true, message: "Your booking is canceled" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: error.message })
    }
})

module.exports = router
