
const Hotel = require("../models/hotel.model");

const searchController = async (req, res) => {

    const { destination, checkIn, checkOut, guests } = req.query;
    if (destination === "" || destination.length === 0) {
        return;
    }
    try {
        console.log("searching..." + checkIn + " " + checkOut + " " + destination + " " + guests)
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

}


module.exports = { searchController };