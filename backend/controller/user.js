const User = require("../models/user.model");

//update User
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User is successfully deleted.");
  } catch (error) {
    next(error);
  }
};

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};
//get user by id
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
