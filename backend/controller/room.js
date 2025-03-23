const Room = require("../models/room.model");
const Hotel = require("../models/hotel.model");
const { default: mongoose } = require("mongoose");
//Create Room
const createRoom = async (req, res, next) => {
  console.log("creating room...");
  const newRoom = new Room(req.body);
  const hotelId = req.params.hotelId;
  console.log(req.body)


  try {
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json("Hotel id is not valid!");
    }
    const savedRoom = await newRoom.save();

    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    console.log("room is saved");
    return res.status(201).json(savedRoom);
  } catch (error) {
    next(error);
  }
};
//update room
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(201).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
//Delete room
const deleteRoom = async (req, res, next) => {
  const roomId = req.params.id;
  const hotelId = req.params.hotelId.trim().replace(/\s/g, "");
  console.log("hotel id is " + hotelId + "room id " + roomId);
  try {
    if (
      !mongoose.Types.ObjectId.isValid(roomId) ||
      !mongoose.Types.ObjectId.isValid(hotelId)
    ) {
      return res.status(400).json(" room or hotel id is not valid");
    }

    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(
      hotelId,
      { $pull: { rooms: roomId } },
      { new: true }
    );
    res.status(200).json("Room is succeffully deleted.");
  } catch (error) {
    next(error);
  }
};

//Get all room

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

//Get room by id
const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
};
