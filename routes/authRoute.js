import express from "express";
import {
  forgetPasswordController,
  loginController,
  requestChangeEmailController,
  // logoutController,
  signupController,
  updatePasswordController,
  verifyChangeEmailController,
  verifyResetOTPController,
  verifyTokenController,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get('/token/verify', isAuthenticated, verifyTokenController);
router.post("/password/reset-request", forgetPasswordController);
router.post("/password/reset-verify", verifyResetOTPController);
router.post('/password/update', isAuthenticated, updatePasswordController)
router.post("/email/change-request", isAuthenticated, requestChangeEmailController);
router.post("/email/change-verify", isAuthenticated, verifyChangeEmailController);

// router.post("/logout", logoutController);

export default router;
