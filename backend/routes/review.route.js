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

router.get('/:id', async (req, res) => {
    const hotelId = req.params.id

    try {
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json('hotel id is not valid!')
        }
        const reviews = await Hotel.findById(hotelId).populate("reviews")
        if (!reviews) {
            return res.status(400).json('No reviews found!')
        }
        console.log(reviews)
        return res.status(200).json(reviews)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Failed to get review", error: error.message })
    }
})

module.exports = router