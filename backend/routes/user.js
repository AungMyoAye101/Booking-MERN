const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user");


const { default: mongoose } = require("mongoose");
const Booking = require('../models/booking.model');
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUserById);

module.exports = router;
