import { z } from "zod";

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
 *         - authorization_code
 *         - transaction_cost
 *         - transaction_revenue
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

export const transactionSchema = z.object({
  id_user: z
    .number({
      required_error: "El id de usuarios es requerido",
      invalid_type_error: "Debe de ser un numero entero",
    })
    .min(1, "El id de usuario no puede ir vacio"),
  id_company: z
    .number({
      required_error: "El id de la compañia  es requerido",
      invalid_type_error: "Debe de ser un numero entero",
    })
    .min(1, "El id de la compañia no puede ir vacio"),
  id_product: z
    .number({
      required_error: "El id del producto  es requerido",
      invalid_type_error: "Debe de ser un numero entero",
    })
    .min(1, "El id del producto no puede ir vacio"),
  id_payment_method: z
    .number({
      required_error: "El id del metodo de pago es requerido",
      invalid_type_error: "Debe de ser un numero entero",
    })
    .min(1, "El id del producto no puede ir vacio"),
  transaction_amount: z
    .number({
      required_error: "El Monto de la transacción  es requerido",
      invalid_type_error: "Debe de ser un numero entero",
    })
    .min(1, "El monto de la transaccioón no puede ir vacio"),
  transaction_currency: z
    .string({
      required_error: "La divisa es requerida",
      invalid_type_error: "Debe de ser un string",
    })
    .min(1, "El monto de la transaccioón no puede ir vacio"),
  transaction_status: z
    .string({
      required_error: "El status es requerido",
      invalid_type_error: "Debe de ser un string",
    })
    .min(1, "El monto de la transaccioón no puede ir vacio"),
});
