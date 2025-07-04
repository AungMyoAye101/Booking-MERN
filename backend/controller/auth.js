const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Redister new user
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "User  already exist!" });
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
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json({ success: true, message: "User created successfully.", user: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Email or password does not match!" })
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000  // Restrict cookie sharing across origins
    });
    return res.status(201).json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
};

const logout = (req, res) => {
  try {

    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "user logout" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
};


//check current user
const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.id)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    res.status(200).json({ success: true, message: "success", data: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { register, login, logout, currentUser };
