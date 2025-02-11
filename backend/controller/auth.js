const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
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
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(400, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Worng username or password"));
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
