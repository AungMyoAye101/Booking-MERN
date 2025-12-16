import { NotFoundError } from "../common/errors";
import { checkMongoIdValid } from "../common/helper";
import Hotel from "../models/hotel.model";
import { paginationResponseFormater } from "../utils/paginationResponse";
import { hotelType } from "../validation/hotelSchema";
import { paginationType } from "../validation/pagination";

export const createHotelService = async (
    data: hotelType,
) => {
    return await Hotel.create(data);
}
//update hotel
export const updateHotelService = async (
    id: string,
    data: hotelType
) => {
    return await Hotel.findByIdAndUpdate(id, { data })
}

export const deleteHotelService = async (id: string) => {
    return await Hotel.findByIdAndDelete(id);
}
//get hotel by id
export const getHotelByIdService = async (id: string) => {

    const hotel = await Hotel.findById(id).lean();
    if (!hotel) {
        throw new NotFoundError("Hotel not found.")
    }
    return hotel;
}

//get all hotels
export const getAllHotelsService = async (
    pagination: paginationType
) => {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const skip = (page - 1) * limit;
    const hotels = await Hotel.find().skip(skip).limit(limit).lean();

    const total = await Hotel.countDocuments();
    const meta = paginationResponseFormater(page, limit, total)

    if (!hotels) {
        throw new NotFoundError("Hotels are not found.")
    }
    return { hotels, meta };
}