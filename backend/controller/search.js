
const Hotel = require("../models/hotel.model");

const searchController = async (req, res) => {

    const { destination, minPrice, maxPrice, page = 1, limit = 6, rating, sort } = req.query;
    console.log(sort)
    // if (destination === "" || destination.length === 0) {
    //     return;
    // }
    const searchQuery = {
        city: { $regex: new RegExp(destination, 'i') },
    }
    if (rating) {
        searchQuery.rating = parseInt(rating)
    }
    if (minPrice || maxPrice) {
        searchQuery.price = {}
        if (minPrice) searchQuery.price.$gte = parseInt(minPrice || 1)
        if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice || 999)
    }
    const skip = (parseInt(page) - 1) * parseInt(limit)
    let sortOption = {}

    if (sort === "priceAsc") {
        sortOption = { price: 1 }
    } else if (sort === 'priceDesc') {
        sortOption = { price: -1 }
    } else if (sort === 'highest') {
        sortOption = { rating: -1 }
    } else if (sort === 'lowest') {
        sortOption = { rating: 1 }
    } else {
        sortOption = {}
    }

    console.log(sortOption)
    try {
        const hotel = await Hotel.find({}).sort(sortOption).skip(skip).limit(limit);

        if (hotel.length === 0) {
            return res.status(404).json({ success: false, message: "No destination found!" });
        }

        return res.status(200).json({ success: true, message: "Success", data: hotel });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to search!" });
    }

}


module.exports = { searchController };