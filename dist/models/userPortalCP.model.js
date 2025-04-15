import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
//import { Company } from "./company.model.js";
export const UserPortal = sequelize.define("users_portal", {
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
        allowNull: false,
    },
}, {
    tableName: "user_portal_CP",
    timestamps: true,
});
/* Company.hasMany(UserPortal, {
  foreignKey: "id_company",
  sourceKey: "id_company",
});

UserPortal.belongsTo(Company, {
  foreignKey: "id_company",
  targetKey: "id_company",
}); */
