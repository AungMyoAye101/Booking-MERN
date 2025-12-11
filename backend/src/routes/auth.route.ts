import { Router } from "express";
import { loginController, logoutController, registerController } from "../controller/auth.controller";
import { validateRequestBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validation/authSchema";

const router = Router();

router.post("/register", validateRequestBody(registerSchema), registerController);
router.post("/login", validateRequestBody(loginSchema), loginController);
router.post("/logout", logoutController);

export default router
