import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const ToWatch = sequelize.define(
  "ToWatch",
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "to_watch",
    timestamps: true,
  }
);

export default ToWatch;
