import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const statusServicePayment = sequelize.define(
  "status_service_payment",
  {
    id_status_service_payments: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status_operation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "status_service_payment",
    timestamps: true,
  }
);
