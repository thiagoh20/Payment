import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller.js";
import { validateMiddleware } from "../middlewares/validator.middleware.js";
import { transactionSchema } from "../schemas/transaction.schema.js";
const router = Router();



/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API para gestionar transacciones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - id_user
 *         - id_company
 *         - id_product
 *         - id_payment_method
 *         - transaction_amount
 *         - transaction_currency
 *         - transaction_status
 *       properties:
 *         id_user:
 *           type: integer
 *         id_company:
 *           type: integer
 *         id_product:
 *           type: integer
 *         id_payment_method:
 *           type: integer
 *         transaction_amount:
 *           type: number
 *         transaction_currency:
 *           type: string
 *         transaction_status:
 *           type: string
 *         authorization_code:
 *           type: string
 *         transaction_cost:
 *           type: number
 *         transaction_revenue:
 *           type: number
 */

/**
 * @swagger
 * /transactions/get-transactions:
 *   get:
 *     summary: Obtener todas las transacciones
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Lista de transacciones obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */

router.get("/get-transactions", TransactionController.getAllTransaction);

/**
 * @swagger
 * /transaction/create-transaction:
 *   post:
 *     summary: Crear una nueva transacción
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transacción creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 */

router.post(
  "/create-transaction",
  validateMiddleware.validateSchema(transactionSchema),
  TransactionController.createTransaction
);

/**
 * @swagger
 * /transaction/update-transaction/{id_transaction}:
 *   put:
 *     summary: Actualizar una transacción existente
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id_transaction
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transacción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transacción actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 transaction:
 *                   $ref: '#/components/schemas/Transaction'
 */

router.put(
  "/update-transaction/:id_transaction",
  validateMiddleware.validateSchema(transactionSchema),
  TransactionController.updateTrasaction
);

export default router;
