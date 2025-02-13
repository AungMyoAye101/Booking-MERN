const jwt = require("jsonwebtoken");
const { createError } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) next(createError(401, "You are not authenicated"));

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) next(createError(403, "Tokn is not valid"));
    req.user = user;
    next();
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

module.exports = { verifyAdmin, verifyUser };
