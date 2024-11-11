import { Router } from "express";
import {
  getServiceParts,
  addServicePart,
  updateServicePart,
  deleteServicePart,
} from "../controllers/ServicePartController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const router = Router();

router.get("/:carId", authenticateToken, getServiceParts);
router.post("/:carId", authenticateToken, addServicePart);
router.put("/:carId/:partId", authenticateToken, updateServicePart);
router.delete("/:carId/:partId", authenticateToken, deleteServicePart);

export default router;
