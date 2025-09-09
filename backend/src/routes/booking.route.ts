// const express = require("express")
// const { default: mongoose } = require("mongoose")
// const Booking = require("../models/booking.model")
// const Room = require("../models/room.model")
import express from "express"
import mongoose from "mongoose"
import Booking from "../models/booking.model";
import Room from "../models/room.model";
import { bookingRoom, canceledBooking, myBooking } from "../controller/booking";

const router = express.Router()

router.post('/', bookingRoom)
router.get('/mybooking/:userId', myBooking)
router.post('/cancel-booking', canceledBooking)

export default router
