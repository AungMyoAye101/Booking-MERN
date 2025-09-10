import mongoose, { Document, Types } from "mongoose";
import { IRoom } from "./room.model";
import { IReview } from "./review.model";
import { IImage } from "./image.model";

export interface IHotel extends Document {
  name: string,
  title: string,
  description: string,
  photos: mongoose.Types.ObjectId[] | IImage[],
  rating: number,
  type: string,
  address: string,
  rooms: Types.ObjectId[] | IRoom[]
  reviews: Types.ObjectId[] | IReview[]
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
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    }],
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
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    price: {
      type: Number,
      requried: true,
    },
    amenities: {
      type: [String],
      requried: true
    },
    distance: {
      type: String,
    },

    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);
export default Hotel;
