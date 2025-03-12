const Hotel = require("../models/hotel.model");
const cloudinary = require("cloudinary");
//Create hotel
const createHotel = async (req, res) => {
  console.log(req.body);


  // try {
  //   //   const images = req.files.map(async (img) => {
  //   //     const b64 = Buffer.from(img.buffer).toString("base64");
  //   //     const dataURI = `data:${img.mimetype};base64,${b64}`;
  //   //     const res = await cloudinary.uploader.upload(dataURI);
  //   //     return res.secure_url;
  //   //   });
  //   // } catch (error) {
  //   //   console.error("Error uploading image to Cloudinary:", error);
  //   //   throw error; // Re-throw the error to stop the process
  //   // }
  //   const photos = req.files.map((file) => file.path);
  //   // const photos = await Promise.all(images);
  //   const newHotel = new Hotel({ ...req.body, photos });


  //   const savedHotel = await newHotel.save();
  //   console.log("Hotel created", savedHotel);
  //   res.status(201).json(savedHotel);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
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
  const {
    destination,
    min = 0,
    max = 99999,
    limit = 10,
    ...others
  } = req.query;
  console.log(min, max, limit, others);
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
