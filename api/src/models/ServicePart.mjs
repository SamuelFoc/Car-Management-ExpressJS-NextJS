import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const ServicePart = sequelize.define(
  "ServicePart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    carId: {
      type: DataTypes.UUID,
      allowNull: false, // Each service part belongs to a car
      references: {
        model: "cars",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Service part name (e.g., Oil Change, Air Filter)
    },
    defaultIntervalMiles: {
      type: DataTypes.INTEGER,
      allowNull: false, // Default mileage interval for the service
    },
    defaultIntervalDays: {
      type: DataTypes.INTEGER,
      allowNull: false, // Default time interval (in days) for the service
    },
  },
  {
    tableName: "service_parts",
    timestamps: true,
  }
);

export default ServicePart;
