var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Transaction } from "../models/transactions.model.js";
export class TransactionService {
    /**
     * Método GET para agregar una transacción
     * @return Transacción array con las transacciones
     */
    static getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield Transaction.findAll();
                return transactions;
            }
            catch (error) {
                throw new Error("Erro al obtener todas las transacciónes" + error);
            }
        });
    }
    /**
     * Método POST para agregar una transacción
     * @param data { user_id, id_company, id_product, id_payment_method, trasanction_amount, transaction_currency, transaction_status, authorization_code, transaction_cost, transaction_revenue }
     * @return Transacción creada
     */
    static createTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield Transaction.create(Object.assign({}, data));
                return transaction;
            }
            catch (error) {
                throw new Error("Error al agregar una transacción" + error);
            }
        });
    }
    /**
     * Método PUT para actualizar una transacción
     * @param data { user_id, id_company, id_product, id_payment_method, trasanction_amount, transaction_currency, transaction_status, authorization_code, transaction_cost, transaction_revenue }
     * @return Transacción creada
     */
    static updateTransaction(id_transaction, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trasaction = yield Transaction.findByPk(id_transaction);
                if (!trasaction) {
                    console.log("Transacción no encontrada");
                }
                yield (trasaction === null || trasaction === void 0 ? void 0 : trasaction.update(data));
                return { success: true, trasaction };
            }
            catch (error) {
                throw new Error("Error al editar la transacción" + error);
            }
        });
    }
}
