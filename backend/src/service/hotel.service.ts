import { NotFoundError } from "../common/errors";
import { checkMongoIdValid } from "../common/helper";
import Hotel from "../models/hotel.model";
import { hotelType } from "../validation/hotelSchema";

export const createHotelService = async (
    data: hotelType
) => {
    return await Hotel.create({ data });
}
//update hotel
export const updateHotelService = async (
    id: string,
    data: hotelType
) => {
    checkMongoIdValid(id);
    const hotel = await Hotel.findById(id);
    if (!hotel) {
        throw new NotFoundError("Hotel not found.")
    }
    await Hotel.findByIdAndUpdate(hotel._id, { data })
}

export const deleteHotelService = async (id: string) => {
    checkMongoIdValid(id);
    const hotel = await Hotel.findById(id);
    if (!hotel) {
        throw new NotFoundError("Hotel not found.")
    };

    return await Hotel.findByIdAndDelete(hotel._id);
}
//get hotel by id
export const getHotelByIdService = async (id: string) => {
    checkMongoIdValid(id);
    const hotel = await Hotel.findById(id);
    if (!hotel) {
        throw new NotFoundError("Hotel not found.")
    }
    return hotel;
}

//get all hotels
export const getAllHotelsService = async () => {
    const hotels = await Hotel.find();
    if (!hotels) {
        throw new NotFoundError("Hotels are not found.")
    }
    return hotels;
}