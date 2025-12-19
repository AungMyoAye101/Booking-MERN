import { v2 as cloudinary } from "cloudinary";
import { Request } from "express"
import { HotelWithImageType, UploadedFile } from "../types/type"
import { checkMongoIdValid } from "../common/helper";
import { BadRequestError, NotFoundError, ValidationError } from "../common/errors";
import Image from "../models/image.model";
import Hotel from "../models/hotel.model";
import fs from "fs/promises";
import Room from "../models/room.model";

export const uploadHotelImgService = async (
    req: Request
) => {
    if (!req.file) {
        throw new ValidationError([{
            message: "Image is required.",
            path: "image"
        }]);
    }
    const file = req.file;
    //upload img to cloudinary 

    const uploaded = await cloudinary.uploader.upload(
        file.path,
        {
            folder: "Booking",
            resource_type: "image"
        });

    if (!uploaded) {
        throw new BadRequestError("Failed to upload image to cloudinary.")
    }
    const hotelId = checkMongoIdValid(req.params.id);
    const image = await Image.create({
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
    });

    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { photo: image._id })

    if (!updatedHotel) {
        throw new NotFoundError("Hotel was not found.");
    }
    await fs.unlink(file.path);
    return updatedHotel;
};

//remove image from hotel

export const updateHotelImgService = async (
    req: Request
) => {
    if (!req.file) {
        throw new ValidationError([{
            message: "Image is required.",
            path: "image"
        }]);
    };
    const file = req.file;


    const hotelId = checkMongoIdValid(req.validatedParams.hotelId);
    const imageId = checkMongoIdValid(req.validatedParams.imageId)
    const hotel = await Hotel.findById(hotelId).populate("photo") as any;

    if (!hotel) {
        throw new NotFoundError("Hotel was not found.")
    }

    const [deletePhoto, uploaded] = await Promise.all([
        cloudinary.uploader.destroy(hotel.photo.public_id),
        cloudinary.uploader.upload(file.path, {
            folder: "Booking",
            resource_type: "image"
        })
    ]);
    if (!uploaded) {
        throw new BadRequestError("Failed to upload image to cloudinary.")
    };
    const updateImage = await Image.findByIdAndUpdate(imageId, { secure_url: uploaded.secure_url, public_id: uploaded.public_id })
    hotel.photo = updateImage?._id;
    await hotel.save()
    await fs.unlink(file.path);
    return hotel;
}
export const uploadRoomImgService = async (
    req: Request
) => {
    if (!req.file) {
        throw new ValidationError([{
            message: "Image is required.",
            path: "image"
        }]);
    }
    const file = req.file;
    const { roomId } = req.validatedParams;
    //upload img to cloudinary 

    const uploaded = await cloudinary.uploader.upload(
        file.path,
        {
            folder: "Booking",
            resource_type: "image"
        });

    if (!uploaded) {
        throw new BadRequestError("Failed to upload image to cloudinary.")
    }

    const image = await Image.create({
        secure_url: uploaded.secure_url,
        public_id: uploaded.public_id,
    });

    const updateRoom = await Room.findByIdAndUpdate(roomId, { photo: image._id })

    if (!updateRoom) {
        throw new NotFoundError("Hotel was not found.");
    }
    await fs.unlink(file.path);
    return updateRoom;
};

//remove image from hotel

export const updateRoomImgService = async (
    req: Request
) => {
    if (!req.file) {
        throw new ValidationError([{
            message: "Image is required.",
            path: "image"
        }]);
    };
    const file = req.file;
    const { imageId, roomId } = req.validatedParams

    const roomExits = await Room.findById(roomId).select("_id photo").populate("photo") as any;

    if (!roomExits) {
        throw new NotFoundError("Hotel was not found.")
    }

    const [deletePhoto, uploaded] = await Promise.all([
        cloudinary.uploader.destroy(roomExits.photo.public_id),
        cloudinary.uploader.upload(file.path, {
            folder: "Booking",
            resource_type: "image"
        })
    ]);
    if (!uploaded) {
        throw new BadRequestError("Failed to upload image to cloudinary.")
    };
    await Image.findByIdAndUpdate(imageId, { secure_url: uploaded.secure_url, public_id: uploaded.public_id })

    const room = await Room.findByIdAndUpdate(roomId, { photo: uploaded.secure_url });
    await fs.unlink(file.path);
    return room;
}