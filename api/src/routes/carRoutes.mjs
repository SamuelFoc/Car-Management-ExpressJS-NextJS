import { Router } from "express";
import { authenticateToken } from "../middleware/auth.mjs";
import {
  addCar,
  getCarDetails,
  deleteCar,
  updateCarDetails,
  updateCarMileage,
} from "../controllers/CarController.mjs";

const router = Router();

router.post("/", authenticateToken, addCar); // Add a new car
router.get("/:carId", authenticateToken, getCarDetails); // Get car details by ID
router.delete("/:carId", authenticateToken, deleteCar); // Delete a car by ID
router.put("/:carId", authenticateToken, updateCarDetails); // Update all car details
router.patch("/:carId", authenticateToken, updateCarMileage); // Update car mileage

export default router;
