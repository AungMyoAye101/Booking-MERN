import mongoose, { Document } from "mongoose";
import { IBooking } from "./booking.model";

export interface IRoom extends Document {
  title: string,
  description: string,

  maxPeople: number,

  price: number,
  hotel: string,
  roomNumbers: {
    number: number,
    booking: IBooking
  }

}

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
