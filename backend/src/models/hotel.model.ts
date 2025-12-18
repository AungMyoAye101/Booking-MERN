import mongoose, { Document, Types } from "mongoose";
import { IRoom } from "./room.model";
import { IReview } from "./review.model";
import { IImage } from "./image.model";

export interface IHotel extends Document {
  name: string,
  title: string,
  description: string,
  photo: mongoose.Types.ObjectId | IImage,
  rating: number,
  star: number,
  type: "hotel" | "motel" | "guest-house",
  address: string,
  price: number
  amenities: string[]
  distance: string,
  city: string,
}

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      index: true
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      index: true
    },
    star: {
      type: Number,
      min: 1,
      max: 5,
      index: true
    },
    type: {
      type: String,
      required: true,
      default: "hotel",
      index: true
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      requried: true,
    },
    amenities: {
      type: [String],
      requried: true,
      index: true
    },
    distance: {
      type: String,
    },

    city: {
      type: String,
      required: true,
      index: true
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);
export default Hotel;
