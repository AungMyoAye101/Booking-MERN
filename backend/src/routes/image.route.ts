import { Router } from "express";
import { validateRequestParams } from "../middleware/validation.middleware";
import { IDSchema } from "../validation/authSchema";

const router = Router();

router.post('/upload/hotel/:id', validateRequestParams(IDSchema))
router.delete('/remove/hotel/:id', validateRequestParams(IDSchema))
router.post('/upload/room/:id', validateRequestParams(IDSchema))
router.delete('/remove/room/:id', validateRequestParams(IDSchema))