import Car from "../models/Car.mjs";

export const addCar = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const newCar = await Car.create({ userId, ...req.body });
    res.status(201).json({ message: "Car added successfully.", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the car." });
  }
};

export const getCarDetails = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from the route parameter
    const userId = req.user.id;

    const car = await Car.findOne({ where: { id: carId, userId } });

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.json({ car });
  } catch (error) {
    console.error("Error fetching car details:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching car details." });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from the route parameter
    const userId = req.user.id;

    const car = await Car.findOne({ where: { id: carId, userId } });

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    await car.destroy();

    res.json({ message: "Car deleted successfully." });
  } catch (error) {
    console.error("Error deleting car:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the car." });
  }
};

export const updateCarDetails = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from the route parameter
    const userId = req.user.id;

    const car = await Car.findOne({ where: { id: carId, userId } });

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    await car.update(req.body); // Update all provided details

    res.json({ message: "Car updated successfully.", car });
  } catch (error) {
    console.error("Error updating car details:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the car details." });
  }
};

export const updateCarMileage = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from the URL parameter
    const { mileage } = req.body; // Get the new mileage from the request body
    const userId = req.user.id; // Get the userId from the authenticated user

    if (!mileage) {
      return res.status(400).json({ message: "Mileage is required." });
    }

    // Find the car that belongs to the user
    const car = await Car.findOne({ where: { id: carId, userId } });

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    // Update the mileage
    await car.update({ mileage });

    res.json({ message: "Car mileage updated successfully.", car });
  } catch (error) {
    console.error("Error updating car mileage:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the car mileage." });
  }
};
