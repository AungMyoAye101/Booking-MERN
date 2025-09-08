import { Request, Response } from "express";
import Hotel from "../models/hotel.model";
import mongoose from "mongoose";
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
interface FilesRequest extends Request {
  files?: UploadedFile[]
}
//Create hotel
export const createHotel = async (req: FilesRequest, res: Response) => {
  const photos = req.files
  if (!photos) {
    return res.status(400).json({ success: false, message: "No images!" })
  }

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
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }

};

//Update hotel

// export const updateHotel = async (req: FilesRequest, res: Response) => {
//   const { id } = req.params
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ success: false, message: "Hotel id is not valid." })
//   }

//   const photos = req.files
//   if (photos) {

//     const urls = photos.map(img => img.path);
//   }

//   let { existingPhotos } = req.body
//   if (!existingPhotos) existingPhotos = []
//   if (typeof existingPhotos === 'string') {
//     existingPhotos = [existingPhotos]
//   }
//   const updatePhotos = [...existingPhotos, ...urls]
//   try {
//     const updatedHotel = await Hotel.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body, photos: updatePhotos },
//       { new: true }
//     );

//     return res.status(200).json({ success: true, message: "Hotel updated successful", data: updatedHotel });
//   } catch (error) {
//     if (error instanceof Error)
//       return res.status(500).json({ success: false, message: error.message });
//   }
// };

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Hotel is successfully deleted." });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};
//Get all hotel
export const getAllHotels = async (req: Request, res: Response,) => {
  const { page = '1', limit = '6' } = req.query
  try {
    const skip = (Number(page) - 1) * Number(limit)
    const hotels = await Hotel.find().skip(skip).limit(Number(limit));
    if (!hotels) {
      return res.status(404).json({ success: false, message: "No hotels found!" })
    }
    const total = await Hotel.countDocuments()
    const totalPage = Math.ceil(total / Number(limit))

    return res.status(200).json({
      success: true, message: "Get all hotels success.", data: hotels, pagination: {
        page,
        hasNextPage: Number(page) < totalPage,
        hasPrevPage: Number(page) > 1
      }
    });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};

//get hotel by specific id
export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    return res.status(200).json({ success: true, message: "Success to get hotel by id", data: hotel });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHotelByType = async (req: Request, res: Response) => {
  const types = req.query.type && String(req.query.type).split(',')

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
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHotelByCity = async (req: Request, res: Response) => {


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
    return res.status(200).json({ success: true, message: "Get hotel by city success.", data: hotels })
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
}
//get hotels base on type
export const hotelsByType = async (req: Request, res: Response) => {

  const { type } = req.params
  const { page = '1', limit = '5' } = req.query


  if (!type || type === '') {
    return res.status(400).json({ success: false, message: "type is required!" })
  }
  const skip = (Number(page) - 1) * Number(limit)
  try {

    const hotel = await Hotel.find({ type: { $regex: type, $options: "i" } }).skip(skip).limit(Number(limit))

    if (hotel.length === 0) {
      return res.status(404).json({ success: false, message: "No hotel found in this type." })
    }
    const totalHotel = await Hotel.countDocuments({ type: { $regex: type, $options: "i" } })
    const totalPages = Math.ceil(totalHotel / Number(limit))

    const hasNextPage = Number(page) < totalPages
    const hasPrevPage = Number(page) > 1
    return res.status(200).json({
      success: true, message: "get hotels by type is success", data: hotel, pagination: {
        totalPages,
        hasNextPage,
        hasPrevPage,
        page, limit
      }
    })
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
}

export const getSuggestion = async (req: Request, res: Response) => {
  const { query } = req.query
  if (!query) {
    return res.status(400).json({ success: false, message: "No query!" })
  }

  try {

    const data = await Hotel.distinct("city", {
      city: { $regex: query, $options: "i" }
    })


    res.status(200).json({ success: true, message: "Get city suggestion", data })
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message })
  }
}



