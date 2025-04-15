import express, { type Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import transactionRoutes from "./routes/transaction.routes.js";
import userPortalRoutes from "./routes/userPortal.routes.js";
import paymentRoutes from "./routes/paymentWay.routes.js";
import { swaggerConfig } from "./config/swaggerConfig.js";
const app: Express = express();

//parsee peticiones a formato json
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

//configuracion swagger
swaggerConfig(app);

//api routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/user-portal", userPortalRoutes);
app.use("/api/paymentWay", paymentRoutes);

app.get("/", async (_req, res) => {
  res.status(200).json("OK");
});

export { app };
