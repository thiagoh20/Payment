import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { UserPortal } from "./user_portal_cp.model.js";

export const SupplierPay = sequelize.define(
  "supplier_pay",
  {
    id_supplier: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_supplier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user_portal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "supplier_pay",
    timestamps:true
  }
);

UserPortal.hasMany(SupplierPay, {
  foreignKey: "id_user_portal",
  sourceKey: "id_user_portal",
});

SupplierPay.belongsTo(UserPortal, {
  foreignKey: "id_user_portal",
  targetKey: "id_user_portal",
});
