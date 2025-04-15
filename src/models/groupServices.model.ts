import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { UserPortal } from "./user_portal_cp.model.js";

export const GroupService = sequelize.define(
  "group_service",
  {
    id_group_service: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user_portal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "group_service",
    timestamps: true,
  }
);

UserPortal.hasMany(GroupService, {
  foreignKey: "id_user_portal",
  sourceKey: "id_user_portal",
});

GroupService.belongsTo(UserPortal, {
  foreignKey: "id_user_portal",
  targetKey: "id_user_portal",
});
