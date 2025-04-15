import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { GroupService } from "./groupServices.model.js";
import { SupplierPay } from "./supplier_pay.model.js";
import { PaymentMethod } from "./payment_methods.model.js";
import { UserPortal } from "./user_portal_cp.model.js";

export const ParameterTx = sequelize.define(
  "parameter_tx",
  {
    id_parameter: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_group_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_payment_method: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user_portal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "parameter_tx",
    timestamps: true,
  }
);

GroupService.hasMany(ParameterTx, {
  foreignKey: "id_group_service",
  sourceKey: "id_group_service",
});

SupplierPay.hasMany(ParameterTx, {
  foreignKey: "id_supplier",
  sourceKey: "id_supplier",
});

PaymentMethod.hasMany(ParameterTx, {
  foreignKey: "id_payment_method",
  sourceKey: "id_payment_method",
});

UserPortal.hasMany(ParameterTx, {
  foreignKey: "id_user_portal",
  sourceKey: "id_user_portal",
});

//----------------------------------

ParameterTx.belongsTo(GroupService, {
  foreignKey: "id_group_service",
  targetKey: "id_group_service",
});

ParameterTx.belongsTo(SupplierPay, {
  foreignKey: "id_supplier",
  targetKey: "id_supplier",
});

ParameterTx.belongsTo(PaymentMethod, {
  foreignKey: "id_payment_method",
  targetKey: "id_payment_method",
});

ParameterTx.belongsTo(UserPortal, {
  foreignKey: "id_user_portal",
  targetKey: "id_user_portal",
});
