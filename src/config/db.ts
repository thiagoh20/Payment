import { Sequelize, Dialect } from "sequelize";
import mysql from "mysql2";

import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} from "./config.js";

export const sequelize = new Sequelize({
  host: DB_HOST as string,
  username: DB_USER as string,
  password: DB_PASSWORD as string,
  database: DB_NAME as string,
  dialect: DB_DIALECT as Dialect,
  logging: false,
  dialectModule: mysql,
  benchmark: true,
});

/**
 *
 * @async
 * @function checkConnection
 * @description
 * Se verifica si la conexion a la base de datos esta establecida o ocurrio algun error
 * @returns - mensaje de conexion exitosa
 * @throws {Error} - Lanza error si la conexion no se establecio
 */

async function connectionDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos establecida con éxito.");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  }
}

connectionDB();
