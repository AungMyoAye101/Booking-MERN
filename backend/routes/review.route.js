const { default: mongoose } = require("mongoose")
const Review = require("../models/review.model")

const express = require("express")
const Hotel = require("../models/hotel.model")
const router = express.Router()

router.post('/', async (req, res) => {
    const { userId, hotelId } = req.body
    console.log(userId, hotelId)
    try {
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json("userid or hotelId is not valid!")
        }

        const newReview = await Review.create({ ...req.body })
        await Hotel.findByIdAndUpdate(hotelId, {
            $push: { reviews: newReview._id }
        })
        console.log(newReview, "reviewed succefully")
        res.status(201).json(newReview)
    } catch (error) {
        console.log(error.message

        )
        res.status(500).json(error.message)
    }
})

module.exports = router