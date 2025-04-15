import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { type Express } from "express";
import { PORT, BACKEND_URL } from "./config.js";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API CRM POCKI",
      version: "1.0.0",
      description: "API para la gestión de transacciones y usuarios",
    },
    servers: [
      {
        url: `${BACKEND_URL}/api` || `http://localhost:${PORT}/api`,
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(options);

export const swaggerConfig = (app: Express): void => {
  try {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    console.log("✅ Swagger Run");
  } catch (error: any) {
    console.error("Swagger error ❌" + error);
  }
};
