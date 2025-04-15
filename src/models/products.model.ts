import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import { GroupService } from "./groupServices.model";
import { serviceCategory } from "./service_category.model";
import { serviceSubCategory } from "./service_subcategory.model";
import { Company } from "./company.model";
import { UserPortal } from "./user_portal_cp.model";

export const Product = sequelize.define(
  "products",
  {
    id_product: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_group_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_service_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_service_subcategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    id_user_portal: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

GroupService.hasMany(Product, {
  foreignKey: "id_group_service",
  sourceKey: "id_group_service",
});

serviceCategory.hasMany(Product, {
  foreignKey: "id_service_category",
  sourceKey: "id_service_category",
});

serviceSubCategory.hasMany(Product, {
  foreignKey: "id_service_subcategory",
  sourceKey: "id_service_subcategory",
});

Company.hasMany(Product, {
  foreignKey: "id_company",
  sourceKey: "id_company",
});

UserPortal.hasMany(Product, {
  foreignKey: "id_user_portal",
  sourceKey: "id_user_portal",
});

// ----------------------------------

Product.belongsTo(GroupService, {
  foreignKey: "id_group_service",
  targetKey: "id_group_service",
});

Product.belongsTo(serviceCategory, {
  foreignKey: "id_service_category",
  targetKey: "id_service_category",
});

Product.belongsTo(serviceSubCategory, {
  foreignKey: "id_service_subcategory",
  targetKey: "id_service_subcategory",
});

Product.belongsTo(Company, {
  foreignKey: "id_company",
  targetKey: "id_company",
});

Product.belongsTo(UserPortal, {
  foreignKey: "id_user_portal",
  targetKey: "id_user_portal",
});
