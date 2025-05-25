
const Hotel = require("../models/hotel.model");

const searchController = async (req, res) => {

    const { destination, minPrice, maxPrice, page = 1, limit = 6, rating, sortByPrice, sortByRating } = req.query;

    console.log(req.query)
    // if (destination === "" || destination.length === 0) {
    //     return;
    // }
    const searchQuery = {
        // city: { $regex: new RegExp(destination, 'i') },
    }
    const ratingNum = parseInt(rating)
    if (!isNaN(Number(ratingNum))) {
        searchQuery.rating = ratingNum
    }
    if (minPrice || maxPrice) {
        searchQuery.price = {}
        if (minPrice) searchQuery.price.$gte = parseInt(minPrice) || 1
        if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice) || 999999
    }
    const skip = (parseInt(page) - 1) * parseInt(limit)
    let sortOption = {}

    if (sortByPrice === "highestPrice") {
        sortOption = { price: -1 }
    } else if (sortByPrice === "lowestPrice") {
        sortOption = { price: 1 }
    } else {
        sortOption = {}
    }

    if (sortByRating === "highestRating") {
        sortOption = { rating: -1 }
    } else if (sortByRating === "lowestRating") {
        sortOption = { rating: 1 }
    } else {
        sortOption = {}
    }

    // try {
    //     const hotel = await Hotel.find(searchQuery).sort(sortOption).skip(skip).limit(limit);

    //     if (hotel.length === 0) {
    //         return res.status(404).json({ success: false, message: "No destination found!" });
    //     }

    //     return res.status(200).json({ success: true, message: "Success", data: hotel });

    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({ message: "Failed to search!" });
    // }

}


module.exports = { searchController };