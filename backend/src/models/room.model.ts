import mongoose, { Document, Types } from "mongoose";


export interface IRoom extends Document {
  title: string,
  description: string,
  type: string,
  maxPeople: number,
  price: number,
  hotel: Types.ObjectId,
  roomNo: number,
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
    type: {
      type: String,
      required: true
    },
    maxPeople: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    roomNo: {
      type: Number,
      required: true
    },
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
