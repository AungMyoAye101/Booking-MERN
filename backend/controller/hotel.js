const Hotel = require("../models/hotel.model");
const cloudinary = require("cloudinary").v2;
//Create hotel
const createHotel = async (req, res) => {
  console.log("uploading file from broswer")

  const { name, title, city, distance, rating, address, type, price, description, photos } = req.body;

  try {
    const uploadedImages = photos.map((img) => {
      return cloudinary.uploader.upload(img, { folder: "hotels" })
    })
    const uploadResponse = await Promise.all(uploadedImages)
    const urls = uploadResponse.map((img) => img.secure_url)

    const newHotel = new Hotel({
      name,
      title,
      city,
      address,
      type,
      price,
      description,
      rating,
      distance,
      photos: urls
    });
    const savedHotel = await newHotel.save();
    console.log("hotel saved")
    res.status(201).json(savedHotel);
  } catch (error) {
    console.log(error.message)
    res.status(500).json('failed to upload images')
  }

};

//Update hotel

const updateHotel = async (req, res) => {
  console.log("upadting hotel...")
  const { photos } = req.body
  try {


    const uploadedImages = photos.map((img) => {
      return cloudinary.uploader.upload(img, { folder: "hotels" })
    })
    const uploadResponse = await Promise.all(uploadedImages)
    const urls = uploadResponse.map((img) => img.secure_url)


    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, photos: urls },
      { new: true }

    );
    console.log("hotel was updated!")
    res.status(200).json(updatedHotel);
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
  const {
    destination,
    min = 0,
    max = 99999,
    limit = 10,
    ...others
  } = req.query;

  let filter = {};
  if (destination) {
    filter.city = { $regex: city, $options: "i" };
  }
  // if (min || max) {
  //   filters.CheapPrice = {};
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
