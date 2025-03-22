
const Hotel = require("../models/hotel.model");

const searchController = async (req, res) => {
    console.log("searching...")
    const { destination } = req.query;
    if (destination === "" || destination.length === 0) {
        return;
    }
    try {
        const newSearch = await Hotel.find({ city: { $regex: new RegExp(destination, 'i') } });

        if (newSearch.length === 0) {
            return res.status(404).json({ message: "No destination found!" });
        }
        console.log(newSearch);
        return res.status(200).json(newSearch);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to search!" });
    }
    res.status(200).json(destination);
}


module.exports = { searchController };