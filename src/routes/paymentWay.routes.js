import { Router } from "express";
import { PaymentWayController  } from "../controllers/paymentWay/paymentWay.controller.js";
import { paymentWayServices } from "../controllers/paymentWay/paymentWayServices.controller.js";
import { validateMiddleware } from "../middlewares/validator.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";

const router = Router();

// PaymentWay
router.post("/paymentlink/createlink",PaymentWayController.generatePaymentLink);


//PaymentWay services
router.get("/get-categories/:name",paymentWayServices.getCategories);

router.get("/get-products/:name",paymentWayServices.getProducts);

router.get("/get-productById/:productId",paymentWayServices.getProductsById);

router.get("/get-productById/:productId",paymentWayServices.getProductsById);

router.get("/get-productSearch/:name",paymentWayServices.getProductosSearch);

router.post("/invoice",paymentWayServices.getInvoiceInfo)

export default router;