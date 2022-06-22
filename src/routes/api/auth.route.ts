import { Router } from "express";
import { validate } from "../../middleware/";
import { authValidation } from "../../validations";
import { authController } from "../../controllers";

const router = Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post(
  "/refresh-tokens",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

export default router;
