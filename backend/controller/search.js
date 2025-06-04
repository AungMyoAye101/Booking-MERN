
const Hotel = require("../models/hotel.model");

const searchController = async (req, res) => {

    const { destination, minPrice, maxPrice, page = 1, limit = 4, rating, sortByPrice, sortByRating } = req.query;

    // if (destination === "" || destination.length === 0) {
    //     return res.status(400).json({ success: false, message: "Destination is required and cannot be empty!" });
    // }
    const searchQuery = {
        city: { $regex: new RegExp(destination, 'i') },
    }

    if (rating) {
        const ratingNum = rating.split(',').map(Number)
        searchQuery.rating = { $in: ratingNum }
    }

    if (minPrice || maxPrice) {
        searchQuery.price = {}
        if (minPrice) searchQuery.price.$gte = parseInt(minPrice) || 1
        if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice) || 999999
    }
    const skip = (parseInt(page) - 1) * parseInt(limit)
    let sortOption = {}

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
        const totalPages = Math.ceil(total / limit)
        const hasNextPage = page < totalPages
        const hasPrevPage = page > 1
        console.log(totalPages)
        return res.status(200).json({
            success: true, message: "Success", data: hotel, pagination: {
                totalPages,
                hasPrevPage,
                hasNextPage,
                page
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to search!" });
    }

}


module.exports = { searchController };