import { DataTypes } from "sequelize";
import sequelize from "../db/index.mjs";

const Car = sequelize.define(
  "Car",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    licensePlate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engine: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enginePower: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    drivetrain: {
      type: DataTypes.ENUM("4WD", "2WD"),
      allowNull: true,
    },
    powerWheels: {
      type: DataTypes.ENUM("Front", "Rear", "All"),
      allowNull: true,
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Initial mileage
    },
  },
  {
    tableName: "cars",
    timestamps: true,
  }
);

export default Car;
