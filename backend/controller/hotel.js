const Hotel = require("../models/hotel.model");

//Create hotel
const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update hotel

const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel is succeffully deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
};
//Get all hotel
const getAllHotels = async (req, res, next) => {
  const { name, min = 0, max = 99999, limit, ...others } = req.query;
  console.log(min, max, limit, others);
  let filter = {};
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }
  // if (min || max) {
  //   filters.price = {};
  //   if (min) filters.price.$gte = parseFloat(min);
  //   if (max) filters.price.$lte = parseFloat(max);
  // }

  try {
    const hotels = await Hotel.find(filter).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

//get hotel by specific id
const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

const getHotelByType = async (req, res, next) => {
  console.log(req.query);
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  getHotelByType,
};
