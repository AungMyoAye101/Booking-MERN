const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user");


const { default: mongoose } = require("mongoose");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUserById);


module.exports = router;
