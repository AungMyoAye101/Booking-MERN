import { Router } from "express";
import { loginController, logoutController, refeshController, registerController } from "../controller/auth.controller";
import { validateRequestBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { isAuthenticated } from "../middleware/isAuthenticated";

const router = Router();

router.post("/register", validateRequestBody(registerSchema), registerController);
router.post("/login", validateRequestBody(loginSchema), loginController);
router.post("/logout", isAuthenticated, logoutController);
router.post('/refresh', refeshController)

export default router
