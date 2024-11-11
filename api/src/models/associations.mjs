import User from "./User.mjs";
import Car from "./Car.mjs";
import ServicePart from "./ServicePart.mjs";
import Service from "./Service.mjs";

// USER - CAR
User.hasMany(Car, { foreignKey: "userId", onDelete: "CASCADE" });
Car.belongsTo(User, { foreignKey: "userId" });

// CAR - SERVICE PART
Car.hasMany(ServicePart, { foreignKey: "carId", onDelete: "CASCADE" });
ServicePart.belongsTo(Car, { foreignKey: "carId" });

// CAR - SERVICE
Car.hasMany(Service, { foreignKey: "carId", onDelete: "CASCADE" });
Service.belongsTo(Car, { foreignKey: "carId", onDelete: "CASCADE" });

// SERVICE - SERVICE PART
Service.hasMany(ServicePart, { foreignKey: "serviceId", onDelete: "CASCADE" });
ServicePart.belongsTo(Service, {
  foreignKey: "serviceId",
  onDelete: "CASCADE",
});

export const setupAssociations = () => {
  // This function ensures associations are set up when needed
};
