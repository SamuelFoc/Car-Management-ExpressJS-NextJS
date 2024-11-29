import express from "express";
import {
  createCarDocument,
  getCarDocuments,
  updateCarDocument,
  deleteCarDocument,
} from "../controllers/CarDocumentController.mjs";
import { authenticateToken } from "../middleware/auth.mjs";

const router = express.Router();

router.post("/:carId", authenticateToken, createCarDocument); // Create a CarDocument for a specific car
router.get("/:carId", authenticateToken, getCarDocuments); // Get all CarDocuments for a specific car
router.put("/:carId/:documentId", authenticateToken, updateCarDocument); // Update a CarDocument by ID for a specific car
router.delete("/:carId/:documentId", authenticateToken, deleteCarDocument); // Delete a CarDocument by ID for a specific car

export default router;
