import mongoose, { Document } from "mongoose";
import { IImage } from "./image.model";

export interface IHotel extends Document {
  name: string,
  description: string,
  photo: mongoose.Types.ObjectId | IImage,
  rating: number,
  star: number,
  type: "hotel" | "motel" | "guest-house",
  address: string,
  price: number
  amenities: string[]
  city: string,
  country: string,
}

const hotelSchema = new mongoose.Schema(
  {
    name: {
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
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      requried: true,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    amenities: {
      type: [String],
      requried: true,
      index: true
    },

  },
  { timestamps: true }
);
hotelSchema.index({ name: 1, city: 1, createdAt: 1 });


const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);
export default Hotel;
