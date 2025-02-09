const Room = require("../models/room.model");

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRooms,
};
