const express = require("express");
const { register, login, logout, currentUser } = require("../controller/auth");
const { verifyUser } = require("../utils/verifyToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyUser, currentUser);

module.exports = router;
