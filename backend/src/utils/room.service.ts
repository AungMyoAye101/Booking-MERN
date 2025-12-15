import { BadRequestError, NotFoundError } from "../common/errors";
import Hotel from "../models/hotel.model"
import Room from "../models/room.model";
import { createRoomType } from "../validation/roomSchema";
import {
    Request

} from "express";
export const createRoomService = async (
    hotelId: string,
    data: createRoomType
) => {
    const hotel = await Hotel.exists({ _id: hotelId });
    if (!hotel) {
        throw new NotFoundError("Hotel not found.")
    };
    const room = await Room.create({ data, hotel: hotelId });
    if (!room) {
        throw new BadRequestError("Faild to create room.")
    }
    const update = await Hotel.findByIdAndUpdate(hotelId, { rooms: { $push: room._id } }, { new: true })
    return { room, hotel: update }
};

export const updateRoomService = async (
    req: Request
) => {
    const { roomId } = req.validatedParams;
    const data = req.validatedBody;
    const room = await Room.exists({ _id: roomId })

    if (!room) {
        throw new NotFoundError("Room  not found.")
    };

    return await Room.findOneAndUpdate(
        { _id: roomId },
        { data },
        { new: true }
    )
}
export const deleteRoomService = async (
    req: Request
) => {
    const { roomId, hotelId } = req.validatedParams;
    const room = await Room.findByIdAndDelete({ _id: roomId }).select("hotel");

    if (!room) {
        throw new NotFoundError("Room  not found.")
    };

    return await Hotel.findOneAndUpdate(
        { _id: hotelId },
        { rooms: { $pull: roomId } },
        { new: true }
    )
}

export const getRoomByIdService = async (id: string) => {
    return await Room.findById(id).lean();
}

export const getRoomByHotelIdService = async (
    hotelId: string,
) => {
    const hotel = await Hotel.exists({ _id: hotelId });
    if (!hotel) {
        throw new NotFoundError("Hotel not found.");
    };

    return await Room.find({ _id: hotelId }).lean();
}