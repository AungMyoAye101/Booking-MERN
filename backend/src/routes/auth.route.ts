import express from "express"
import { currentUser, login, logout, register } from "../controller/auth";
import { verifyUser } from "../utils/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/me",verifyUser, currentUser);

export default router
