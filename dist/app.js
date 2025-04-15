var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import transactionRoutes from "./routes/transaction.routes.js";
import userPortalRoutes from "./routes/userPortal.routes.js";
import { swaggerConfig } from "./config/swaggerConfig.js";
const app = express();
//parsee peticiones a formato json
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
//configuracion swagger
swaggerConfig(app);
//api routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/user-portal", userPortalRoutes);
app.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json("OK");
}));
export { app };
