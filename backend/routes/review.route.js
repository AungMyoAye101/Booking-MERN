const { default: mongoose } = require("mongoose")
const Review = require("../models/review.model")

const express = require("express")
const Hotel = require("../models/hotel.model")
const router = express.Router()

router.post('/', async (req, res) => {
    const { userId, hotelId } = req.body

    try {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json("userid or hotelId is not valid!")
        }

        const newReview = await Review.create({ ...req.body })
        await Hotel.findByIdAndUpdate(hotelId, {
            $push: { reviews: newReview._id }
        })
        console.log(newReview, "reviewed succefully")
        res.status(201).json({ sucess: true, message: "Review created successfull." })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const hotelId = req.params.id

    try {
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json('hotel id is not valid!')
        }
        const reviews = await Review.find({ hotelId }).populate("userId", "name email").sort({ createdAt: -1 }).limit(4)
        if (!reviews) {
            return res.status(400).json('No reviews found!')
        }
        return res.status(200).json({ success: true, message: "Get review successfull.", data: reviews })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
})

module.exports = router