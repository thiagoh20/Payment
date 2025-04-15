import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { UserPortal } from "./user_portal_cp.model";

export const serviceSubCategory = sequelize.define(
  "service_subcategory",
  {
    id_service_subcategory: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_service_subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user_portal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "service_subcategory",
    timestamps: true,
  }
);

UserPortal.hasMany(serviceSubCategory, {
  foreignKey: "id_user_portal",
  sourceKey: "id_user_portal",
});

serviceSubCategory.belongsTo(UserPortal, {
  foreignKey: "id_user_portal",
  targetKey: "id_user_portal",
});
