import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { UserPortal } from "./userPortalCP.model.js";
export const PaymentMethod = sequelize.define("payment_methods", {
    id_payment_method: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    method_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user_portal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "payment_methods",
    timestamps: true,
});
UserPortal.hasMany(PaymentMethod, {
    foreignKey: "id_user_portal",
    sourceKey: "id_user_portal",
});
PaymentMethod.belongsTo(UserPortal, {
    foreignKey: "id_user_portal",
    targetKey: "id_user_portal",
});
