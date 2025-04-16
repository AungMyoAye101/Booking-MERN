const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json("User  already exist!");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: 3 * 24 * 60 * 60 }
    );

    res.cookie("access_token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body
  console.log(email, password)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong username or password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      withCredentials: true,
      maxAge: 24 * 60 * 60 * 1000     // Restrict cookie sharing across origins
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json("user logout");
};

module.exports = { register, login, logout };
