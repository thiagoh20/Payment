import { Company } from "./company.model";
import { UserPortal } from "./user_portal_cp.model";

export const defineAssociations = () => {
  UserPortal.hasMany(Company, {
    foreignKey: "id_user_portal",
    sourceKey: "id_user_portal",
  });

  Company.belongsTo(UserPortal, {
    foreignKey: "id_user_portal",
    targetKey: "id_user_portal",
  });
};
