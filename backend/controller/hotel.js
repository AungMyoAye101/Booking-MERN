const Hotel = require("../models/hotel.model");

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllHotels,
};
