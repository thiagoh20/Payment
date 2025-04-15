import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service.js";
import { ITransaction } from "../interface/transaction.interface.js";

export class TransactionController {
  /**
   * Método para obtener las transaccione
   */
  static async getAllTransaction(_req: Request, res: Response): Promise<void> {
    try {
      const transaccions = await TransactionService.getAllTransactions();
      res.status(200).json({
        message: "Transacciones obtenidas correctamente",
        transacciones: transaccions,
      });
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al obtener las transacciones", error });
    }
  }

  /**
   * Método para la creación de una transacción
   */

  static async createTransaction(req: Request, res: Response): Promise<void> {
    const data: ITransaction = req.body;
    //console.log(data);
    try {
      const newTransaction = await TransactionService.createTransaction(data);
      res.status(200).json({
        message: "Se creo correctamente la transaccion",
        transaction: newTransaction,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: "Error al crear la transacción", error });
    }
  }

  /**
   * Método para actualizar  una transacción
   */

  static async updateTrasaction(req: Request, res: Response): Promise<void> {
    const id_transaction = req.params.id_transaction;
    const data: ITransaction = req.body;

    try {
      const updateTrasaction = await TransactionService.updateTransaction(
        id_transaction,
        data
      );
      res.status(200).json({
        message: "Se actualizo correctamente la transacción",
        transaction: updateTrasaction,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Erro al actualizar la transacción ", error });
    }
  }
}
