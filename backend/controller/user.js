const User = require("../models/user.model");

//update User
const updateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ success: true, message: "User updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User is successfully deleted.");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};
//get user by id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, message: "User get success", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
};



module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
