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
    return res.status(201).json({ success: true, message: "Hotel created successful", data: savedHotel });
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

    return res.status(200).json({ success: true, message: "Hotel updated successful", data: updatedHotel });
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
const getAllHotels = async (req, res,) => {
  const { page = 1, limit = 6 } = req.query
  try {
    const skip = (page - 1) * limit
    const hotels = await Hotel.find().skip(skip).limit(limit);
    if (!hotels) {
      return res.status(404).json({ success: false, message: "No hotels found!" })
    }
    const total = await Hotel.countDocuments()
    const totalPage = Math.ceil(total / limit)

    return res.status(200).json({
      success: true, message: "Get all hotels success.", data: hotels, pagination: {
        page,
        hasNextPage: page < totalPage,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get hotel by specific id
const getHotelById = async (req, res) => {
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

    const results = await Promise.all(
      types.map(async (type) => {
        const count = await Hotel.countDocuments({ type: { $regex: type, $options: 'i' } })
        const hotel = await Hotel.findOne({ type: { $regex: type, $options: 'i' } })
        return {
          type,
          count,
          photo: hotel && hotel.photos && hotel.photos.length > 1 ? hotel.photos[0] : null
        }

      })
    )
    console.log(results)

    return res.status(200).json({
      success: true, message: "Success to get hotel by type", data: results
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

//get hotels base on type
const hotelsByType = async (req, res) => {

  const { type } = req.params
  const { page = 1, limit = 5 } = req.query
  console.log(req.query)

  if (!type || type === '') {
    return res.status(400).json({ success: false, message: "type is required!" })
  }
  const skip = (page - 1) * limit
  try {

    const hotel = await Hotel.find({ type: { $regex: type, $options: "i" } }).skip(skip).limit(limit)

    if (hotel.length === 0) {
      return res.status(404).json({ success: false, message: "No hotel found in this type." })
    }
    const totalHotel = await Hotel.countDocuments({ type: { $regex: type, $options: "i" } })
    const totalPages = Math.ceil(totalHotel / limit)

    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1
    res.status(200).json({
      success: true, message: "get hotels by type is success", data: hotel, pagination: {
        totalPages,
        hasNextPage,
        hasPrevPage,
        page, limit
      }
    })
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
  getHotelByCity,
  hotelsByType
};
