const Room = require("../models/room.model");
const Hotel = require("../models/hotel.model");
const { default: mongoose } = require("mongoose");
//Create Room
const createRoom = async (req, res, next) => {
  console.log("creating room...");
  const { title, description, maxPeople, price, roomNumber } = req.body;
  const hotelId = req.params.hotelId;

  try {
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json("Hotel id is not valid!");
    }

    const roomNumbers = roomNumber.map((num) => ({ number: num, booking: [] }));

    const newRoom = await Room.create({
      title,
      description,
      maxPeople,
      price,
      roomNumbers,
      hotel: hotelId,
    });
    console.log("room is created");


    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });
    console.log("hotel is updated");
    return res.status(201).json(newRoom);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Failed to create room", error.message);
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
// Booking Room

const bookingRoom = async (req, res, next) => {
  const { roomId, roomNumber, userId, checkIn, checkOut } = req.body;
  try {

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json("Room id is not valid");
    }
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json("Room not found");
    }

    const selectedRoom = room.roomNumbers.find((r) => r.number === Number(roomNumber));
    if (!selectedRoom) {
      return res.status(404).json("Room number not found");
    }


    const isAvailable = selectedRoom.booking.every((booking) => {
      return new Date(checkIn) >= new Date(booking.checkOut) || new Date(checkOut) <= new Date(booking.checkIn);
    });
    console.log(isAvailable)

    if (!isAvailable) {

      return res.status(400).json("Room is not available for this date");
    }

    const totalPrice = ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * room.price


    selectedRoom.booking.push({
      userId, checkIn, checkOut, totalPrice
    })

    await room.save()

    return res.status(200).json({ message: "room boookin successfull", totalPrice })
  } catch (error) {
    next(error);
  }
}

const checkAvailability = async (req, res) => {
  const { hotel, checkIn, checkOut, guests } = req.body

  if (!mongoose.Types.ObjectId.isValid(hotel)) {
    return res.status(400).json("hotel Id is not valid")
  }
  try {
    const rooms = await Room.find({ hotel })

    const availableRooms = rooms.map((room) => {

      const availableRoomNumbers = room.roomNumbers.filter((r) => r.booking.every((date) => new Date(date) < new Date(checkIn) || new Date(date) > new Date(checkOut)))

      return { ...room.toObject(), roomNumbers: availableRoomNumbers }

    })

    res.status(200).json(availableRooms)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  bookingRoom,
  checkAvailability
};
