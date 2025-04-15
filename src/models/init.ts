import { sequelize } from "../config/db";

import "./company.model";
import "./groupServices.model";
import "./parameter_tx.model";
import "./payment_methods.model";
import "./products.model";
import "./service_category.model"
import "./service_payment.model"
import "./service_subcategory.model"
import "./status_service_payment.model"
import "./supplier_pay.model";
import "./transactions.model";
import "./type_idetification.model"
import "./type_money.model"
import "./user_portal_cp.model";
import "./users.model";
import { defineAssociations } from "./associations";

defineAssociations()

export default sequelize;
