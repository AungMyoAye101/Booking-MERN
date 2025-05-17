const Hotel = require("../models/hotel.model");

const cloudinary = require("cloudinary").v2;
//Create hotel
const createHotel = async (req, res) => {
  console.log("uploading file from browser")

  const { photos } = req.body;
  let urls;
  try {
    const uploadedImages = photos.map((img) => {
      return cloudinary.uploader.upload(img, { folder: "hotels" })
    })
    const uploadResponse = await Promise.all(uploadedImages)
    urls = uploadResponse.map((img) => img.secure_url)
    console.log("image uploaded")
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })

  }

  // add hotel with uploaded image urls to database
  try {
    const newHotel = new Hotel({
      ...req.body,
      photos: urls
    });
    const savedHotel = await newHotel.save();
    console.log("hotel saved")
    return res.status(201).json({ success: true, message: "Hotel created successfull", hotels: savedHotel });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message })
  }

};

//Update hotel

const updateHotel = async (req, res) => {
  console.log("updating hotel...")
  const { photos, amenities } = req.body


  let urls;

  try {
    const uploadedImages = photos.map((img) => {
      return cloudinary.uploader.upload(img, { folder: "hotels" })
    })
    const uploadResponse = await Promise.all(uploadedImages)
    urls = uploadResponse.map((img) => img.secure_url)
    console.log("image uploaded")
    if (urls.length === 0) {
      return res.status(400).json({ success: false, message: "Please upload at least one image" })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })

  }
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, photos: urls },
      { new: true }

    );

    return res.status(200).json({ success: true, message: "Hotel updated successfull ", hotels: updatedHotel });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Hotel is successfully deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
    filter.city = { $regex: destination, $options: "i" };
  }
  // if (min || max) {
  //   filters.CheapPrice = {};
  //   if (min) filters.price.$gte = parseFloat(min);
  //   if (max) filters.price.$lte = parseFloat(max);
  // }

  try {
    const hotels = await Hotel.find(filter).limit(limit);
    return res.status(200).json({ success: true, message: "Get all hotels success.", data: hotels });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get hotel by specific id
const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    return res.status(200).json({ success: true, message: "Success to get hotel by id", data: hotel });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getHotelByType = async (req, res) => {
  const types = req.query.type.split(',')
  if (!types) {
    return res.status(404).json({ success: false, message: "Hotel types are required!" })
  }


  try {

    const counts = await Promise.all(types.map(data => (Hotel.countDocuments({ type: { $regex: `^${data}`, $options: 'i' } }))
    ))

    const data = types.map((type, i) => ({
      type,
      count: counts[i]
    }))
    return res.status(200).json({
      success: true, message: "Success to get hotel by type", data
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getHotelByCity = async (req, res) => {

  const cities = req.query.city.split(',')
  try {

    const hotel = await Promise.all(cities.map((data) =>
      Hotel.find({ city: { $in: data } })
    ))
    res.status(200).json({ success: true, message: "Get hotel by city success.", data: hotel })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  getHotelByType,
  getHotelByCity
};
