import ServicePart from "../models/ServicePart.mjs";

export const getServiceParts = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from params

    const serviceParts = await ServicePart.findAll({ where: { carId } });

    if (serviceParts.length === 0) {
      return res
        .status(404)
        .json({ message: "No service parts found for this car." });
    }

    res.json({ serviceParts });
  } catch (error) {
    console.error("Error fetching service parts:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching service parts." });
  }
};

export const addServicePart = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from params
    const { name, defaultIntervalMiles, defaultIntervalDays } = req.body;

    const newServicePart = await ServicePart.create({
      carId,
      name,
      defaultIntervalMiles,
      defaultIntervalDays,
    });

    res.status(201).json({
      message: "Service part added successfully.",
      servicePart: newServicePart,
    });
  } catch (error) {
    console.error("Error adding service part:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the service part." });
  }
};

export const updateServicePart = async (req, res) => {
  try {
    const { carId, partId } = req.params; // Get carId and partId from params
    const { name, defaultIntervalMiles, defaultIntervalDays } = req.body;

    const servicePart = await ServicePart.findOne({
      where: { id: partId, carId },
    });

    if (!servicePart) {
      return res.status(404).json({ message: "Service part not found." });
    }

    await servicePart.update({
      name: name || servicePart.name,
      defaultIntervalMiles:
        defaultIntervalMiles || servicePart.defaultIntervalMiles,
      defaultIntervalDays:
        defaultIntervalDays || servicePart.defaultIntervalDays,
    });

    res.json({ message: "Service part updated successfully.", servicePart });
  } catch (error) {
    console.error("Error updating service part:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the service part." });
  }
};

export const deleteServicePart = async (req, res) => {
  try {
    const { carId, partId } = req.params; // Get carId and partId from params

    const servicePart = await ServicePart.findOne({
      where: { id: partId, carId },
    });

    if (!servicePart) {
      return res.status(404).json({ message: "Service part not found." });
    }

    await servicePart.destroy();

    res.json({ message: "Service part deleted successfully." });
  } catch (error) {
    console.error("Error deleting service part:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the service part." });
  }
};
