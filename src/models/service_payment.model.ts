import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { statusServicePayment } from "./status_service_payment.model";
import { Transaction } from "./transactions.model";

export const ServicePayment = sequelize.define(
  "service_payment",
  {
    id_service_payment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_transaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_status_service_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attemps_to_success: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { tableName: "service_payment", timestamps: true }
);

statusServicePayment.hasMany(ServicePayment, {
  foreignKey: "id_status_service_payments",
  sourceKey: "id_status_service_payments",
});

Transaction.hasMany(ServicePayment, {
  foreignKey: "id_transaction",
  sourceKey: "id_transaction",
});


// -----------------------------------------

ServicePayment.belongsTo(statusServicePayment, {
  foreignKey: "id_status_service_payments",
  targetKey: "id_status_service_payments",
});

ServicePayment.belongsTo(Transaction, {
  foreignKey: "id_transaction",
  targetKey: "id_transaction",
});
