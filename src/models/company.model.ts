import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";


export const Company = sequelize.define("companies", {
    id_company: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_company: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user_portal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
  },
  {
    tableName: "companies",
    timestamps: true,
  }
);



