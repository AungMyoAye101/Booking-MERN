const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rooms: {
      type: [String],
    },

    cheapestPrice: {
      type: Number,
      requried: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    distance: {
      type: [String],
    },

    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
