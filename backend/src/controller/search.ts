import { Request, Response } from "express";

export const searchController = async (req: Request, res: Response) => {

    const { destination, minPrice, maxPrice, page = '1', limit = '4', rating, sortByPrice, sortByRating } = req.query as {
        destination?: string;
        minPrice?: string;
        maxPrice?: string;
        page?: string;
        limit?: string;
        rating?: string;
        sortByPrice?: string;
        sortByRating?: string;
    };

    if (!destination || destination.trim() === "") {
        return res.status(400).json({ success: false, message: "Destination is required and cannot be empty!" });
    }

    //Search query 
    const searchQuery: Record<string, any> = {
        city: { $regex: new RegExp(destination, 'i') },
    }

    //For Rating
    if (rating) {
        const ratingNum = rating.split(',').map(Number)
        searchQuery.rating = { $in: ratingNum }
    }

    //For price 
    if (minPrice || maxPrice) {
        searchQuery.price = {}
        if (minPrice) searchQuery.price.$gte = parseInt(minPrice) || 1
        if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice) || 999999
    }

    //For pagination 
    const skip = (parseInt(page) - 1) * parseInt(limit)

    //For sorting
    let sortOption: Record<string, 1 | -1> = {}

    if (sortByPrice === "highestPrice") {
        sortOption.price = -1
    } else if (sortByPrice === "lowestPrice") {
        sortOption.price = 1
    }

    if (sortByRating === "highestRating") {
        sortOption.rating = -1
    } else if (sortByRating === "lowestRating") {
        sortOption.rating = 1
    }

    try {
        const hotel = await Hotel.find(searchQuery).sort(sortOption).skip(skip).limit(limit);

        if (hotel.length === 0) {
            return res.status(404).json({ success: false, message: "No destination found!" });
        }
        const total = await Hotel.countDocuments(searchQuery)
        const totalPages = Math.ceil(total / parseInt(limit))
        const hasNextPage = parseInt(page) < totalPages
        const hasPrevPage = parseInt(page) > 1

        return res.status(200).json({
            success: true, message: "Success", data: hotel, pagination: {
                totalPages,
                hasPrevPage,
                hasNextPage,
                page
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to search!" });
    }

}


