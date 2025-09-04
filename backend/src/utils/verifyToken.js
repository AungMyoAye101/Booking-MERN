const jwt = require("jsonwebtoken");


const verifyToken = (token) => {

  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  return decoded

};

const verifyUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).json("Your token is invalid!")
  };
  const user = verifyToken(token)
  if (!user.id) {
    return res.status(400).json({ success: false, message: "You are not authorized!" })
  }

  req.id = user.id
  next()
}

const verifyAdmin = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(400).json("Your token is invalid!")
  };
  const user = verifyToken(token)
  if (user.isAdmin === false) {
    return res.status(400).json({ success: false, message: "You are not allowed!" })
  }
  req.isAdmin = user.isAdmin
  next()
};

module.exports = { verifyAdmin, verifyUser };
