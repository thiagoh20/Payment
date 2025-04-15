import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./users.model";
import { SupplierPay } from "./supplier_pay.model";
import { Product } from "./products.model";
import { PaymentMethod } from "./payment_methods.model";
import { StatusTransaction } from "./status_transaction.model";
import { TypeMoney } from "./type_money.model";

export const Transaction = sequelize.define(
  "transactions",
  {
    id_transaction: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_payment_method: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_status_transaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount_product: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amount_transaction: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    id_type_money: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_reference_supplier: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    const_tx: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    revenue_tx: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    payload: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
  }
);

User.hasMany(Transaction, {
  foreignKey: "id_user",
  sourceKey: "id_user",
});

Product.hasMany(Transaction, {
  foreignKey: "id_product",
  sourceKey: "id_product",
});

SupplierPay.hasMany(Transaction, {
  foreignKey: "id_supplier",
  sourceKey: "id_supplier",
});

PaymentMethod.hasMany(Transaction, {
  foreignKey: "id_payment_method",
  sourceKey: "id_payment_method",
});

StatusTransaction.hasMany(Transaction, {
  foreignKey: "id_status_transaction",
  sourceKey: "id_status_transaction",
});

TypeMoney.hasMany(Transaction, {
  foreignKey: "id_type_money",
  sourceKey: "id_type_money",
});

//----------------------------

Transaction.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id_user",
});

Transaction.belongsTo(Product, {
  foreignKey: "id_product",
  targetKey: "id_product",
});

Transaction.belongsTo(SupplierPay, {
  foreignKey: "id_supplier",
  targetKey: "id_supplier",
});

Transaction.belongsTo(PaymentMethod, {
  foreignKey: "id_payment_method",
  targetKey: "id_payment_method",
});

Transaction.belongsTo(StatusTransaction, {
  foreignKey: "id_status_transaction",
  targetKey: "id_status_transaction",
});

Transaction.belongsTo(TypeMoney, {
  foreignKey: "id_type_money",
  targetKey: "id_type_money",
});
