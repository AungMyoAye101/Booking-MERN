const User = requrie("../models/user.model");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
};
