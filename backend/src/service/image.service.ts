import { v2 } from "cloudinary";
import { Request } from "express"
import { HotelWithImageType, UploadedFile } from "../types/type"
import { checkMongoIdValid } from "../common/helper";
import { BadRequestError, NotFoundError } from "../common/errors";
import Image from "../models/image.model";
import Hotel from "../models/hotel.model";
import fs from "fs/promises"
export const uploadHotelImgService = async (
    req: Request
) => {
    const photo = req.file as UploadedFile;
    const hotelId = checkMongoIdValid(req.validatedParams.id);
    //upload img to cloudinary 
    const uploaded = await v2.uploader.upload(photo.path, { folder: "Booking" })
    if (!uploaded) {
        throw new BadRequestError("Failed to upload image to cloudinary.")
    }
    console.log("cloudinary uploaded.")
    const image = await Image.create({
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
        placeholder: uploaded.placeholder,
        metadata: uploaded.metadata,
    });

    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { photo: image._id })

    if (!updatedHotel) {
        throw new NotFoundError("Hotel was not found.");
    }
    await fs.unlink(photo.path);
    console.log("delete image.")
    return updatedHotel;
};

//remove image from hotel

export const removeHotelImgService = async (
    req: Request
) => {
    const hotelId = checkMongoIdValid(req.validatedParams.id);
    const hotel = await Hotel.findById(hotelId).populate("photo") as any;
    if (!hotel) {
        throw new NotFoundError("Hotel was not found.")
    }

    const deletePhoto = await Promise.all([
        v2.uploader.destroy(hotel.photo.public_id),
        Image.findByIdAndDelete(hotel.photo._id)
    ])
    hotel.photo = {};
    return hotel;
}