import { Request, Response } from "express";
import Room, { IRoom } from "../models/room.model";
import Booking, { IBooking } from "../models/booking.model";
import Hotel, { IHotel } from "../models/hotel.model";
import mongoose, { Types } from "mongoose";


type HotelWithRoomType = Omit<IHotel, "rooms"> & { rooms: IRoom[] }

interface RoomNumbers {
  number: number,
  booking: IBooking[]
}
export interface RoomWithBookingType {
  title: string,
  description: string,
  maxPeople: number,
  price: number,
  hotel: Types.ObjectId,
  roomNumbers: RoomNumbers[]

}


//Create Room

export const createRoom = async (req: Request, res: Response) => {

  const { title, description, maxPeople, price, roomNumber } = req.body as {
    title: string, description: string, maxPeople: number, price: number, roomNumber: string
  };
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
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};
//update room
export const updateRoom = async (req: Request, res: Response) => {
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
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};
//Delete room
export const deleteRoom = async (req: Request, res: Response) => {
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
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};

//Get all room
export const getAllRoomsByHotelId = async (req: Request, res: Response,) => {
  const { hotelId } = req.params
  const { guest, checkIn, checkOut } = req.query as {
    guest?: number,
    checkIn?: string,
    checkOut?: string
  };
  if (!checkIn || !checkOut) {
    return res.status(400).json({ success: false, message: "Check-in and check-out dates are required" });
  }
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ success: false, message: "Invalid hotel id!" })
  }
  try {
    const hotel = (await Hotel.findById(hotelId).populate("rooms")) as HotelWithRoomType
    if (!hotel) {
      return res.status(400).json({ success: false, message: "Failed to fetch hotel." });
    }

    const result = []
    for (const room of hotel.rooms) {
      if (room.maxPeople < Number(guest)) continue

      let availableRoomNumbers = []
      for (const rn of room.roomNumbers) {

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
    return res.status(500).json({ success: false, message: error });
  }
};


//Get room by id
export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
};
// Booking Room



export const checkAvailability = async (req: Request, res: Response) => {
  const { roomId } = req.params
  const { checkIn, checkOut } = req.query as { checkIn?: string, checkOut?: string }
  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json("hotel Id is not valid")
  }
  if (!checkIn || !checkOut) {
    return res.status(400).json("CheckIn and CheckOut date are required.")
  }
  const from = new Date(checkIn)
  const to = new Date(checkOut)

  try {
    const room = await Room.findById(roomId) as RoomWithBookingType
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found." })
    }

    const availableRooms = room.roomNumbers.filter((roomNumber) => {
      const isAvailable = roomNumber.booking.every((b) => (
        to <= b.checkIn || from >= b.checkOut
      ))
      return isAvailable

    })
    return res.status(200).json({ success: true, message: "Room checked successfull", data: availableRooms })
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ success: false, message: error.message });
  }
}


