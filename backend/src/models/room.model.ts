import mongoose, { Document, Types } from "mongoose";
import { IBooking } from "./booking.model";

interface RoomNumbers {
  number: number,
  booking: Types.ObjectId[] | IBooking[]
}
export interface IRoom extends Document {
  title: string,
  description: string,
  maxPeople: number,
  price: number,
  hotel: Types.ObjectId,
  roomNumbers: RoomNumbers[],
  photo: Types.ObjectId,

}

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true
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
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room
