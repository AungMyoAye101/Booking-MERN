import express from "express";
import { searchController } from "../controller/search";
const router = express.Router()
router.get('/', searchController)
export default router