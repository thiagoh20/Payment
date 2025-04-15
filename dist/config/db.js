var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from "sequelize";
import mysql from "mysql2";
import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, } from "./config.js";
export const sequelize = new Sequelize({
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALECT,
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
function connectionDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("✅ Conexión a la base de datos establecida con éxito.");
        }
        catch (error) {
            console.error("❌ No se pudo conectar a la base de datos:", error);
        }
    });
}
connectionDB();
