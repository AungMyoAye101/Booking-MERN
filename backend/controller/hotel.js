const { default: mongoose } = require("mongoose");
const Hotel = require("../models/hotel.model");

const cloudinary = require("cloudinary").v2;
//Create hotel
const createHotel = async (req, res) => {

  const photos = req.files
  if (!photos) {
    return res.status(400).json({ success: false, message: "No images!" })
  }
  try {
    const url = photos.map(img => img.path)

    // add hotel with uploaded image urls to database
    try {

      const newHotel = new Hotel({
        ...req.body,
        photos: url
      });
      const savedHotel = await newHotel.save();
      return res.status(201).json({ success: true, message: "Hotel created successful", data: savedHotel });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }

    res.status(200).json({ message: "uploaded" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }



  // const { photos } = req.body;
  // let urls;
  // try {
  //   const uploadedImages = photos.map((img) => {
  //     return cloudinary.uploader.upload(img, { folder: "hotels" })
  //   })
  //   const uploadResponse = await Promise.all(uploadedImages)
  //   urls = uploadResponse.map((img) => img.secure_url)
  //   console.log("image uploaded")
  // } catch (error) {
  //   return res.status(500).json({ success: false, message: error.message })

  // }



};

//Update hotel

const updateHotel = async (req, res) => {
  // Removed console.log statement for cleaner production logs

  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Hotel id is not valid." })
  }

  const photos = req.files
  const urls = photos.map(img => img.path);
  let { existingPhotos } = req.body
  if (!existingPhotos) existingPhotos = []
  if (typeof existingPhotos === 'string') {
    existingPhotos = [existingPhotos]
  }


  const updatePhotos = [...existingPhotos, ...urls]




  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, photos: updatePhotos },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Hotel updated successful", data: updateHotel });
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
          photo: hotel && hotel.photos && hotel.photos.length >= 1 ? hotel.photos[0] : null
        }

      })
    )

    return res.status(200).json({
      success: true, message: "Success to get hotel by type", data: results
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getHotelByCity = async (req, res) => {


  try {
    const cities = await Hotel.aggregate([
      {
        $group: { _id: "$city" }
      },
      {
        $sample: { size: 3 }
      }
    ])
    const names = cities.map(c => c._id)

    const hotels = await Promise.all(names.map((city) =>
      Hotel.findOne({ city }).lean()
    ))
    console.log(hotels)
    res.status(200).json({ success: true, message: "Get hotel by city success.", data: hotels })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
//get hotels base on type
const hotelsByType = async (req, res) => {

  const { type } = req.params
  const { page = 1, limit = 5 } = req.query


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

const getSuggestion = async (req, res) => {
  const { query } = req.query
  if (!query) {
    return res.status(400).json({ success: false, message: "No query!" })
  }

  try {

    const data = await Hotel.distinct("city", {
      city: { $regex: query, $options: "i" }
    })


    res.status(200).json({ success: true, meassage: "Get city suggestion", data })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message })
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
  hotelsByType,
  getSuggestion
};
