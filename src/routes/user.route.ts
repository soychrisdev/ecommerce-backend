import { Router } from "express";

import authController from "controllers/auth";
import { validators } from "middleware/validate.middleware";
import profileController from "controllers/user/profile.controller";
import { profileControllers } from "controllers/user";
import { authValidator } from "middleware/authValidator.middleware";

const router = Router();

router.get("/profile/:id", authValidator.verifyAccessToken, profileControllers.getProfile);



export default router;
