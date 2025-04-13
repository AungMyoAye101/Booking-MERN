const jwt = require("jsonwebtoken");
const { createError } = require("./error");
const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(400).json("Your token is invalid!")
  };

  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(400).json("Your token is invalid")
    };
    const user = await User.findById(data.id)
    if (!user) {
      return res.status(400).json("You are not authenicated!")
    }
    return res.status(200).json(user)
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.parmas.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized"));
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized"));
    }
  });
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
