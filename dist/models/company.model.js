import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
export const Company = sequelize.define("companys", {
    id_company: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    company_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_nit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    company_website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "companys",
    timestamps: true,
});
