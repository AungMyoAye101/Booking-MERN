const mongoose = require("mongoose");

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
      requried: true,
    },

    roomNumbers: [{ number: Number, unavailableDate: { type: [Date] } }],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
