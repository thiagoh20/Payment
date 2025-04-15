import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const User = sequelize.define("users", {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_identification: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
    timestamps: true,
});
