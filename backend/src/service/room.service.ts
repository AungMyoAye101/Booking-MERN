import { BadRequestError, NotFoundError } from "../common/errors";
import Hotel from "../models/hotel.model"
import Room from "../models/room.model";
import { createRoomType } from "../validation/roomSchema";
import { Request } from "express";

export const createRoomService = async (
    hotelId: string,
    data: createRoomType
) => {

    return await Room.create({ ...data, hotel: hotelId });

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

export const getRoomsByHotelIdService = async (
    hotelId: string,
) => {
    return await Room.find({ hotel: hotelId }).lean();
}