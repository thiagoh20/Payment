import { ITransaction } from "../interface/transaction.interface.js";
import { Transaction } from "../models/transactions.model.js";

export class TransactionService {
  /**
   * Método GET para agregar una transacción
   * @return Transacción array con las transacciones
   */

  static async getAllTransactions() {
    try {
      const transactions = await Transaction.findAll();
      return transactions;
    } catch (error: any) {
      throw new Error("Erro al obtener todas las transacciónes" + error);
    }
  }

  /**
   * Método POST para agregar una transacción
   * @param data { user_id, id_company, id_product, id_payment_method, trasanction_amount, transaction_currency, transaction_status, authorization_code, transaction_cost, transaction_revenue }
   * @return Transacción creada
   */
  static async createTransaction(data: ITransaction) {
    try {
      const transaction = await Transaction.create({ ...data });
      return transaction;
    } catch (error: any) {
      throw new Error("Error al agregar una transacción" + error);
    }
  }

  /**
   * Método PUT para actualizar una transacción
   * @param data { user_id, id_company, id_product, id_payment_method, trasanction_amount, transaction_currency, transaction_status, authorization_code, transaction_cost, transaction_revenue }
   * @return Transacción creada
   */

  static async updateTransaction(
    id_transaction: any,
    data: Partial<ITransaction>
  ) {
    try {
      const trasaction = await Transaction.findByPk(id_transaction);

      if (!trasaction) {
        console.log("Transacción no encontrada");
      }
      await trasaction?.update(data);

      return { success: true, trasaction };
    } catch (error: any) {
      throw new Error("Error al editar la transacción" + error);
    }
  }
}
