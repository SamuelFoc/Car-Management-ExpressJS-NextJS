import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const CarDocument = sequelize.define(
  "CarDocument",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    carId: {
      type: DataTypes.UUID,
      allowNull: false, // Each car document belongs to a car
      references: {
        model: "cars",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Service part name (e.g., Oil Change, Air Filter)
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false, // Date of the service
    },
    valid_to: {
      type: DataTypes.DATE,
      allowNull: false, // Date of the service
    },
  },
  {
    tableName: "car_documents",
    timestamps: true,
  }
);

export default CarDocument;
