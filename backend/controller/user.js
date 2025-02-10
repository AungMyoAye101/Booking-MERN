const User = require("../models/user.model");

//create user
const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User is successfully deleted.");
  } catch (error) {
    res.status(500).jsq(error);
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
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
