import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";


export const UserPortal = sequelize.define(
  "user_portal_CP",
  {
    id_user_portal: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      unique: true,
    },
    rol: {
      type: DataTypes.ENUM("admin", "business"),
      allowNull: false,
    },
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "user_portal_CP",
    timestamps: true,
  }
);

