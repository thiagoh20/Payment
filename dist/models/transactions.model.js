import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
/* import { User } from "./users.model.js";
import { Company } from "./company.model.js";
import { Product } from "./products.model.js";
import { PaymentMethod } from "./paymentMethods.model.js";
 */
export const Transaction = sequelize.define("transactions", {
    id_transaction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_company: {
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
    transaction_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    transaction_currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
    },
    transaction_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    authorization_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    transaction_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    transaction_revenue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
}, {
    tableName: "transactions",
    timestamps: true,
});
/* User.hasMany(Transaction, {
  foreignKey: "id_user",
  sourceKey: "id_user",
});

Company.hasMany(Transaction, {
  foreignKey: "id_company",
  sourceKey: "id_company",
});

Product.hasMany(Transaction, {
  foreignKey: "id_product",
  sourceKey: "id_product",
});

PaymentMethod.hasMany(Transaction, {
  foreignKey: "id_payment_method",
  sourceKey: "id_payment_method",
});

//----------------------------

Transaction.belongsTo(User, {
  foreignKey: "id_user",
  targetKey: "id_user",
});

Transaction.belongsTo(Company, {
  foreignKey: "id_company",
  targetKey: "id_company",
});

Transaction.belongsTo(Product, {
  foreignKey: "id_product",
  targetKey: "id_product",
});

Transaction.belongsTo(PaymentMethod, {
  foreignKey: "id_payment_method",
  targetKey: "id_payment_method",
});
 */ 
