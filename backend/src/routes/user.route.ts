import { Router } from "express";
import { validateRequestQuery } from "../middleware/validation.middleware";
import { paginationSchmea } from "../validation/pagination";
import { getAllUsersController } from "../controller/user.controller";

const router = Router();

router.get(
    "/",
    validateRequestQuery(paginationSchmea),
    getAllUsersController
);

export default router;
