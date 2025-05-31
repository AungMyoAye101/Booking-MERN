const express = require("express")
const { default: mongoose } = require("mongoose")
const Booking = require("../models/booking.model")
const router = express.Router()

router.post('/cancel-booking', async (req, res) => {
    const { userId, roomId, bookingId } = req.body
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
        return res.status(400).json({ success: false, message: "Id is not valid" })
    }
    try {

        await Booking.findByIdAndDelete(bookingId)

        res.status(200).json({ success: true, message: "Your booking is canceled" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: error.message })
    }
})

module.exports = router
