import express from "express"
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controller/user";
import { verifyUser } from "../middleware/verifyToken";




const router = express.Router();

router.get("/", getAllUsers);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);
router.get("/:id", getUserById);


export default router;
