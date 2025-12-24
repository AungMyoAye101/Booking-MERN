import { MongooseQueryOptions } from "mongoose";
import { NotFoundError } from "../common/errors";
import Hotel from "../models/hotel.model";
import { paginationResponseFormater } from "../utils/paginationResponse";
import { hotelType } from "../validation/hotelSchema";
import { Request } from "express";

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
    req: Request
) => {

    const {
        search,
        city,
        min_price,
        max_price,
        min_star,
        max_star,
        min_rating,
        max_rating,
        type,
        page = 1,
        limit = 10 } = req.validatedQuery;

    const skip = (page - 1) * limit;

    const query: any = {};

    if (search) {
        query.name = { $regex: search, $options: "i" }
    };

    if (city) {
        query.city = city;
    };
    if (type) {
        query.type = type;
    }

    if (min_price || max_price) {
        query.price = {};
        if (min_price) query.price.$gte = min_price;
        if (max_price) query.price.$lte = max_price;
    }
    if (min_rating || max_rating) {
        query.rating = {};
        if (min_rating) query.rating.$gte = min_rating;
        if (max_rating) query.rating.$lte = max_rating;
    }
    if (min_star || max_star) {
        query.star = {};
        if (min_star) query.star.$gte = min_star;
        if (max_star) query.star.$lte = max_star;
    }

    const hotels = await Hotel.find(
        query
    ).skip(skip)
        .limit(limit)
        .lean();

    const total = await Hotel.countDocuments(query);
    const meta = paginationResponseFormater(page, limit, total)

    if (!hotels) {
        throw new NotFoundError("Hotels are not found.")
    }
    return { hotels, meta };
}

export const getHotelByTypesService = async () => {

    const deafult_types = ["hotel", "motel", "guest_house"];
    const result = await Hotel.aggregate([
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                type: "$_id",
                count: 1
            }
        }
    ]);

    if (!result) {
        throw new NotFoundError("Hotel types are not found.")
    }

    const map = Object.fromEntries(result.map(v => [v.type, v.count]));

    return deafult_types.map(type => ({
        type,
        count: map[type] || 0
    }
    ));
}