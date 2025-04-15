import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { UserPortal } from "./user_portal_cp.model";

export const serviceCategory = sequelize.define(
  "service_category",
  {
    id_service_category: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_service_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user_portal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "service_category",
    timestamps: true,
  }
);

UserPortal.hasMany(serviceCategory, {
  foreignKey: "id_user_portal",
  sourceKey: "id_user_portal",
});

serviceCategory.belongsTo(UserPortal, {
  foreignKey: "id_user_portal",
  targetKey: "id_user_portal",
});
