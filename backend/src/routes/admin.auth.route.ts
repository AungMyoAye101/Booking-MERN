import { Router } from "express";
import { validateRequestBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { adminLoginController, adminLogoutController, adminRegisterController } from "../controller/admin.controller";

const router = Router();


router.post("/register", validateRequestBody(registerSchema), adminRegisterController);
router.post("/login", validateRequestBody(loginSchema), adminLoginController);
router.post("/logout", adminLogoutController);

export default router;
