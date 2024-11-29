import CarDocument from "../models/CarDocument.mjs";
import Car from "../models/Car.mjs"; // Assuming Car is also a Sequelize model

// Utility function for error handling
const handleError = (
  res,
  error,
  message = "An error occurred",
  statusCode = 500
) => {
  console.error(message, error);
  res.status(statusCode).json({ error: message });
};

// Create a new CarDocument
export const createCarDocument = async (req, res) => {
  try {
    const { carId } = req.params;
    const { name, type, valid_from, valid_to } = req.body;

    if (!carId || !name || !type || !valid_from || !valid_to) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Ensure the car exists before creating a document
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found." });
    }

    const carDocument = await CarDocument.create({
      carId,
      name,
      type,
      valid_from,
      valid_to,
    });

    return res.status(201).json(carDocument);
  } catch (error) {
    handleError(res, error, "Failed to create CarDocument.");
  }
};

// Get all CarDocuments for a specific car
export const getCarDocuments = async (req, res) => {
  try {
    const { carId } = req.params;

    // Ensure the car exists
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found." });
    }

    const carDocuments = await CarDocument.findAll({
      where: { carId },
      attributes: [
        "id",
        "name",
        "type",
        "valid_from",
        "valid_to",
        "createdAt",
        "updatedAt",
      ],
    });

    const result = {
      car: {
        id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        vin: car.vin,
        licensePlate: car.licensePlate,
      },
      documents: carDocuments,
    };

    return res.status(200).json(result);
  } catch (error) {
    handleError(res, error, "Failed to fetch CarDocuments.");
  }
};

// Update a CarDocument for a specific car
export const updateCarDocument = async (req, res) => {
  try {
    const { carId, documentId } = req.params;
    const { name, type, valid_from, valid_to } = req.body;

    // Ensure the car exists
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found." });
    }

    // Ensure the document exists and belongs to the car
    const carDocument = await CarDocument.findOne({
      where: { id: documentId, carId },
    });

    if (!carDocument) {
      return res
        .status(404)
        .json({ error: "CarDocument not found for this car." });
    }

    // Update only provided fields
    const updatedCarDocument = await carDocument.update({
      name,
      type,
      valid_from,
      valid_to,
    });

    return res.status(200).json(updatedCarDocument);
  } catch (error) {
    handleError(res, error, "Failed to update CarDocument.");
  }
};

// Delete a CarDocument for a specific car
export const deleteCarDocument = async (req, res) => {
  try {
    const { carId, documentId } = req.params;

    // Ensure the car exists
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found." });
    }

    // Ensure the document exists and belongs to the car
    const carDocument = await CarDocument.findOne({
      where: { id: documentId, carId },
    });

    if (!carDocument) {
      return res
        .status(404)
        .json({ error: "CarDocument not found for this car." });
    }

    await carDocument.destroy();

    return res
      .status(200)
      .json({ message: "CarDocument deleted successfully." });
  } catch (error) {
    handleError(res, error, "Failed to delete CarDocument.");
  }
};
