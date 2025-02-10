const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

module.exports = router;
