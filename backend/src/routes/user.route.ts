import { Router } from "express";
import { checkMongoDBId, validateRequestBody, validateRequestQuery } from "../middleware/validation.middleware";
import { paginationSchmea } from "../validation/pagination";
import { getAllUsersController, getUserByIdController, updateUserController } from "../controller/user.controller";
import { userSchmea } from "../validation/userSchmea";

const router = Router();

router.get(
    "/",
    validateRequestQuery(paginationSchmea),
    getAllUsersController
);
router.get(
    "/:userId",
    checkMongoDBId(['userId']),
    getUserByIdController
);
router.put(
    "/:userId",
    checkMongoDBId(['userId']),
    validateRequestBody(userSchmea),
    updateUserController
);


export default router;
