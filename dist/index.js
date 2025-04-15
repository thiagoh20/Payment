var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { app } from "./app.js";
import { PORT } from "./config/config.js";
import sequelize from "./models/init.js";
/**
 * Función que inicia el servidor en el puerto espeficado
 * @param {number} PORT
 * @returns {void} console.log(PORT)
 *
 */
function main(PORT) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(PORT, () => {
                console.log(`✅ Server corriendo en el puerto ${PORT}`);
            });
            yield sequelize.sync({ alter: false });
        }
        catch (error) {
            console.error("Error al correr el servidor:", error);
        }
    });
}
main(Number(PORT));
