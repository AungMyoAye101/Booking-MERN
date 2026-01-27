import mongoose, { Document, Types } from "mongoose";

export type Bed_Types = "king" | "queen" | "full" | "twin" | "single";

export interface IRoom extends Document {
  name: string,
  maxPeople: number,
  price: number,
  hotelId: Types.ObjectId,
  totalRooms: number,
  photo: Types.ObjectId,
  bedTypes: Bed_Types
}

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    maxPeople: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    totalRooms: {
      type: Number,
      required: true
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    bedTypes: {
      type: String,
      enum: ["king", "queen", "full", "twin", "single"],
      required: true,
    },
  },
  { timestamps: true }
);

roomSchema.index({ hotelId: 1 })
const Room = mongoose.model("Room", roomSchema);
export default Room
