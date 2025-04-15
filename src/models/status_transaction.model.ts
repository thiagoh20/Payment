import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const StatusTransaction = sequelize.define("status_transactions",
    {
        id_status_transaction: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status_operation: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "status_transactions",
        timestamps: true,
    }
);
