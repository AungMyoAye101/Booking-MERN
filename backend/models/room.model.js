const mongoose = require("mongoose");
const Booking = require("./booking.model");

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    maxPeople: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    roomNumbers: [{
      number: {
        type: Number, required: true
      },
      booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      }]
    }],
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
