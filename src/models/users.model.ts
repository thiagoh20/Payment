import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { typeIdentification } from "./type_idetification.model";

export const User = sequelize.define(
  "users",
  {
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
    id_type_identification: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

typeIdentification.hasMany(User, {
  foreignKey: "id_type_identification",
  sourceKey: "id_type_identification",
});


User.belongsTo(typeIdentification, {
  foreignKey: "id_type_identification",
  targetKey: "id_type_identification",
});

