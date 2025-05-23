const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user");
const { register } = require("../controller/auth");

const { default: mongoose } = require("mongoose");
const Booking = require('../models/room.model');
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUserById);
router.get('/mybooking/:userId', async (req, res) => {
  const { userId } = req.params
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ success: false, message: "Userid is not valid!" })
  }
  try {
    const myBooking = await Booking.find({ userId })
    console.log(myBooking)

    res.status(200).json({ success: true, message: "Booking data get successfully.", data: myBooking })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router;
