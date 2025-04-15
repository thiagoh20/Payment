import { app } from "./app.js";
import { PORT } from "./config/config.js";
import sequelize from "./models/init.js";

/**
 * Función que inicia el servidor en el puerto espeficado
 * @param {number} PORT
 * @returns {void} console.log(PORT)
 *
 */

async function main(PORT: number): Promise<void> {
  try {
    app.listen(PORT, (): void => {
      console.log(`✅ Server corriendo en el puerto ${PORT}`);
    });
    await sequelize.sync({ alter: true });
  } catch (error: any) {
    console.error("Error al correr el servidor:", error);
  }
}

main(Number(PORT));
