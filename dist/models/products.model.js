import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { GroupService } from "./groupServices.model.js";
export const Product = sequelize.define("products", {
    id_product: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    id_group_service: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "products",
    timestamps: true,
});
GroupService.hasMany(Product, {
    foreignKey: "id_group_service",
    sourceKey: "id_group_service",
});
Product.belongsTo(GroupService, {
    foreignKey: "id_group_service",
    targetKey: "id_group_service",
});
