import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    carId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "cars",
        key: "id",
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false, // Date of the service
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false, // Car mileage during the service
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional notes for the service
    },
  },
  {
    tableName: "services",
    timestamps: true,
  }
);

export default Service;
