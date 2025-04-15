import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export const TypeMoney = sequelize.define("type_money", {
  id_type_money: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING(50),
    allowNull: false,
  }
},
{
    tableName: "type_money",
    timestamps: true,
});
