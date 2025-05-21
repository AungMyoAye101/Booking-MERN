const Room = require("../models/room.model");
const Booking = require("../models/booking.model");
const Hotel = require("../models/hotel.model");
const { default: mongoose } = require("mongoose");
//Create Room
const createRoom = async (req, res) => {

  const { title, description, maxPeople, price, roomNumber } = req.body;
  const hotelId = req.params.hotelId;

  try {
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json("Hotel id is not valid!");
    }
    const roomNumbers = roomNumber.split(',').map((num) => num.trim()).map((num) => ({ number: num, booking: [] }));

    const newRoom = await Room.create({
      title,
      description,
      maxPeople,
      price,
      roomNumbers,
      hotel: hotelId,
    });



    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: newRoom._id } });

    return res.status(201).json({ success: true, message: "Room created successfully", data: newRoom });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
    res.status(201).json({ success: true, message: "Room updated.", data: updatedRoom });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
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
    res.status(200).json({ success: true, message: "Room was deleted." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get all room

const getAllRoomsByHotelId = async (req, res,) => {
  const { hotelId } = req.params
  const { guest, checkIn, checkOut } = req.query
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ success: false, message: "Invalid hotel id!" })
  }
  try {
    const hotel = await Hotel.findById(hotelId).populate("rooms")

    const result = []
    for (const room of hotel.rooms) {
      if (room.maxPeople < Number(guest)) continue

      let availableRoomNumbers = []
      for (const rn of room.roomNumbers) {
        console.log(rn)
        const hasBooking = await Booking.exists({
          roomId: room._id,
          roomNumber: rn.number,
          $or: [
            { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
          ]
        })

        if (!hasBooking) {
          availableRoomNumbers.push(rn)
        }
      }

      if (availableRoomNumbers.length > 0) {
        result.push({
          _id: room._id,
          title: room.title,
          description: room.description,
          maxPeople: room.maxPeople,
          price: room.price,
          roomNumbers: availableRoomNumbers
        })
      }
    }


    return res.status(200).json({ success: true, message: "Get all rooms", data: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: error });
  }
};

//Get room by id
const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Booking Room

const bookingRoom = async (req, res) => {
  const { roomId, roomNumber, userId, checkIn, checkOut } = req.body;
  console.log(req.body)
  try {

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ sucess: false, message: "Room id is not valid" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User id is not valid!" });
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const hasConflict = await Booking.exists({
      roomId,
      roomNumber,
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
      ]
    })

    if (hasConflict) {
      return res.status(400).json({ success: false, message: "This room is not available for this date." })
    }

    console.log("checked conflict")
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    console.log(room)
    const totalPrice = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24) * room.price

    console.log(totalPrice)


    const booking = await Booking.create({
      roomId: room._id, roomNumber, userId, checkIn, checkOut, totalPrice
    })

    console.log(booking, "Booking success")

    return res.status(200).json({ success: true, message: "room booking successfull", booking })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: error.message });
  }
}

const checkAvailability = async (req, res) => {
  const { roomId } = req.params
  const { checkIn, checkOut, guests } = req.query
  const from = checkIn
  const to = checkOut

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json("hotel Id is not valid")
  }
  try {
    const room = await Room.findById(roomId)
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found." })
    }

    const availableRooms = room.roomNumbers.filter((roomNumber) => {
      const isAvailable = roomNumber.booking.every(b => (
        to <= b.checkIn || from >= b.checkOut
      ))
      return isAvailable
    })
    return res.status(200).json({ success: true, message: "Room checked successfull", data: availableRooms })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getAllRoomsByHotelId,
  getRoomById,
  bookingRoom,
  checkAvailability
};
