const express = require("express");
const { register, login, logout } = require("../controller/auth");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verifyToken", verifyToken);

module.exports = router;
