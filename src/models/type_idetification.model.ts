import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const typeIdentification = sequelize.define(
  "type_identification",
  {
    id_type_identification: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "type_identification",
    timestamps: true,
  }
);
