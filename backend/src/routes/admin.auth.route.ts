import { Router } from "express";
import { validateRequestBody } from "../middleware/validation.middleware";
import { loginSchema, registerSchema } from "../validation/authSchema";
import { adminLoginController, adminLogoutController, adminRegisterController } from "../controller/admin.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { adminRefreshService } from "../service/auth.admin.service";

const router = Router();


router.post("/register", validateRequestBody(registerSchema), adminRegisterController);
router.post("/login", validateRequestBody(loginSchema), adminLoginController);
router.post("/logout", isAuthenticated, adminLogoutController);
router.post('/refresh', adminRefreshService)

export default router;
