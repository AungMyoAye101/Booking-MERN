const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            require: true,
        },
        review: {
            type: String,
            requrie: true,

        },
        ratings: {
            type: Number,
            min: 1,
            max: 5

        }
    },
    { timestamps: true }
)

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review