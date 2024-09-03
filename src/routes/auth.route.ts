import { Router } from "express";

import authController from "controllers/auth";
import { validators } from "middleware/validate.middleware";

const router = Router();

router.post("/login", validators.loginValidationRules, validators.validate, authController.login);

router.post(
  "/register",
  validators.registerValidationRules,
  validators.validate,
  authController.register,
);



export default router;
