import { Router } from "express";
import {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  validateToken,
} from "../controllers/UserController.auth.mjs";

const router = Router();

// Example route for testing
router.post("/register", register);
router.post("/login", login);
router.post("/validate", validateToken);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
