import { BadRequestError, NotFoundError } from "../common/errors";
import Hotel from "../models/hotel.model"
import Room from "../models/room.model";
import { paginationResponseFormater } from "../utils/paginationResponse";
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

    return await Room.findOneAndUpdate(
        { _id: roomId },
        { data },
        { new: true }
    )
}
export const deleteRoomService = async (
    req: Request
) => {
    const { roomId } = req.validatedParams;
    return await Room.findByIdAndDelete({ _id: roomId });
}

export const getRoomByIdService = async (id: string) => {

    const room = await Room.findById(id).lean();
    if (!room) {
        throw new NotFoundError("Room not found.")
    }
    return room;
}

export const getRoomsByHotelIdService = async (
    req: Request
) => {
    const hotelId = req.validatedParams.hotelId;
    const { page = 1, limit = 10 } = req.validatedQuery;
    const skip = (page - 1) * limit;
    const rooms = await Room.find({ hotel: hotelId })
        .skip(skip)
        .limit(limit)
        .lean();
    if (!rooms) {
        throw new NotFoundError("Rooms not found.")
    }

    const total = await Room.countDocuments({ hotel: hotelId });
    const meta = paginationResponseFormater(page, limit, total);
    return { rooms, meta }
}