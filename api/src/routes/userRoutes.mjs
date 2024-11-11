import { Router } from "express";
import {
  getUserInfo,
  updateUser,
  deleteUser,
} from "../controllers/UserController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const router = Router();

router.get("/info", authenticateToken, getUserInfo);
router.put("/update", authenticateToken, updateUser);
router.delete("/delete", authenticateToken, deleteUser);

export default router;
