import { Router } from "express";

import authController from "controllers/auth";
import { validators } from "middleware/validate.middleware";
import checkOutsController from "controllers/ventipay/checkouts.controller";
import checkOutsControllers from "controllers/ventipay";
import { authValidator } from "middleware/authValidator.middleware";

const router = Router();

router.get("/checkouts", authValidator.verifyAccessToken, checkOutsControllers.checkouts);
router.get("/checkouts/:id", authValidator.verifyAccessToken, checkOutsControllers.checkoutsById);
router.post("/checkouts", authValidator.verifyAccessToken, checkOutsControllers.createCheckout);




export default router;
