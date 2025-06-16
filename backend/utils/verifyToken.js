const jwt = require("jsonwebtoken");


const verifyToken = (token) => {
  if (!token) {
    return res.status(400).json("Your token is invalid!")
  };
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  return decoded

};

const verifyUser = (req, res, next) => {
  const user = verifyToken(req.cookies.token)
  if (!user.id) {
    return res.status(400).json({ success: false, message: "You are not authorized!" })
  }
  console.log(user)
  req.id = user.id
  next()
}

const verifyAdmin = (req, res, next) => {
  const user = verifyToken(req.cookies.token)
  if (user.isAdmin === false) {
    return res.status(400).json({ success: false, message: "You are not allowed!" })
  }
  req.isAdmin = user.isAdmin
  next()
};

module.exports = { verifyToken, verifyAdmin, verifyUser };
