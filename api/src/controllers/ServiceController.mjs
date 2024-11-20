import Service from "../models/Service.mjs";
import ServicePart from "../models/ServicePart.mjs";

export const addService = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from params
    const { parts } = req.body;

    const newService = await Service.create({ carId, ...req.body });

    // Associate parts with the service
    if (parts && parts.length > 0) {
      for (const partId of parts) {
        const servicePart = await ServicePart.findOne({
          where: { id: partId, carId },
        });
        if (servicePart) {
          await servicePart.update({ serviceId: newService.id });
        }
      }
    }

    res
      .status(201)
      .json({ message: "Service added successfully.", service: newService });
  } catch (error) {
    console.error("Error adding service:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the service." });
  }
};

export const getServices = async (req, res) => {
  try {
    const { carId } = req.params; // Get carId from params

    const services = await Service.findAll({
      where: { carId },
      include: [{ model: ServicePart }], // Include service parts
    });

    if (!services || services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this car." });
    }

    res.json({ services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching services." });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { carId, serviceId } = req.params; // Get carId and serviceId from params

    // Find the service
    const service = await Service.findOne({ where: { id: serviceId, carId } });

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    // Unlink associated service parts
    await ServicePart.update(
      { serviceId: null },
      { where: { serviceId: service.id } }
    );

    // Delete the service
    await service.destroy();

    res.json({ message: "Service deleted successfully." });
  } catch (error) {
    console.error("Error deleting service:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the service." });
  }
};

export const updateService = async (req, res) => {
  try {
    const { carId, serviceId } = req.params; // Get carId and serviceId from params
    const { date, mileage, notes, parts } = req.body;

    // Find the service
    const service = await Service.findOne({ where: { id: serviceId, carId } });

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    // Update the service details
    await service.update({ date, mileage, notes });

    // Update associated service parts if provided
    if (parts && parts.length > 0) {
      // Unlink all parts associated with this service
      await ServicePart.update(
        { serviceId: null },
        { where: { serviceId: service.id } }
      );

      // Relink parts to this service
      for (const partId of parts) {
        const servicePart = await ServicePart.findOne({
          where: { id: partId, carId },
        });
        if (servicePart) {
          await servicePart.update({ serviceId: service.id });
        }
      }
    }

    res.json({ message: "Service updated successfully.", service });
  } catch (error) {
    console.error("Error updating service:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the service." });
  }
};
