const express = require("express");
const { register, login, logout, currentUser } = require("../controller/auth");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, currentUser);

module.exports = router;
