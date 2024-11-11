import { Router } from "express";
import { authenticateToken } from "../middleware/auth.mjs";
import {
  addService,
  getServices,
  deleteService,
  updateService,
} from "../controllers/ServiceController.mjs";

const router = Router();

router.post("/:carId", authenticateToken, addService);
router.get("/:carId", authenticateToken, getServices);
router.put("/:carId/:serviceId", authenticateToken, updateService);
router.delete("/:carId/:serviceId", authenticateToken, deleteService);

export default router;
