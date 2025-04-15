var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TransactionService } from "../services/transaction.service.js";
export class TransactionController {
    /**
     * Método para obtener las transaccione
     */
    static getAllTransaction(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaccions = yield TransactionService.getAllTransactions();
                res.status(200).json({
                    message: "Transacciones obtenidas correctamente",
                    transacciones: transaccions,
                });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error al obtener las transacciones", error });
            }
        });
    }
    /**
     * Método para la creación de una transacción
     */
    static createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            //console.log(data);
            try {
                const newTransaction = yield TransactionService.createTransaction(data);
                res.status(200).json({
                    message: "Se creo correctamente la transaccion",
                    transaction: newTransaction,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error al crear la transacción", error });
            }
        });
    }
    /**
     * Método para actualizar  una transacción
     */
    static updateTrasaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id_transaction = req.params.id_transaction;
            const data = req.body;
            try {
                const updateTrasaction = yield TransactionService.updateTransaction(id_transaction, data);
                res.status(200).json({
                    message: "Se actualizo correctamente la transacción",
                    transaction: updateTrasaction,
                });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Erro al actualizar la transacción ", error });
            }
        });
    }
}
