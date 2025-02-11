const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json("User has been created");
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
