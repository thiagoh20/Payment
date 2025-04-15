import { Request, Response } from "express";
import { TransactionService } from "../../services/transaction.service.js";
import { BASE_URL, PAYMENTWAY_API_KEY } from "../../config/config.js";
import { ITransaction } from "../../interface/transaction.interface.js";
import { IPaymentLink } from "../../interface/paymentLink.interface.js";
import { paymentLinkSchema } from "../../schemas/paymentLink.schema.js";
import { paymentWayServices } from "./paymentWayServices.controller";
import axios from "axios";
import { responseNotification } from "../../utils/responseNotification.js";

export class PaymentWayController {
  /**
   * Crea un link de pago
   * @param req - Request
   * @param res - Response
   * @returns {Promise<void>}
   */
  static async generatePaymentLink(req: Request, res: Response): Promise<void> {
    const body: IPaymentLink = req.body;

    const parsedBody = paymentLinkSchema.parse(body);

    const transaction: ITransaction = {
      ...req.body,
      transaction_amount: parsedBody.amount,
      transaction_currency: parsedBody.currency,
    };

    if (!parsedBody.additionaldata.reference) {
      parsedBody.additionaldata.reference = parsedBody.descripcion;
    }

    try {
      await TransactionService.createTransaction(transaction);

      const response = await axios({
        method: "POST",
        url: `${BASE_URL}/ClientAPI/CrearLinkDePago`,
        headers: {
          "Content-Type": "application/json",
          Authorization: PAYMENTWAY_API_KEY,
        },
        data: parsedBody,
      });
      res.status(200).json({
        message: "Link de pago creado correctamente",
        link: response.data,
      });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Error al crear el link de pago",
        error: error.message,
      });
    }
  }

  static async webHook(req: Request, res: Response) {
    console.log("Start webhook");

    const body = req.body;

    console.log(JSON.stringify(body));

    const message = JSON.parse(body.additionaldata.message);
    const statusMap: { [key: number]: number } = { 34: 1, 35: 7, 36: 3, 38: 4 };

    if (message.reference3 == 5) {
      try {
        await axios.post(
          "http://pocki-api-env-1.eba-pprtwpab.us-east-1.elasticbeanstalk.com/api/paymentsway/webhook/handlePurchase",
          body,
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (error: any) {
        console.log(error + "Error handle purchase");
        res.status(500).json({
          message: "Error handle purchase",
          error: error.message,
        });
      }

      const paymentStatus = Number(body.idstatus?.id);
      if (paymentStatus) {
        if (paymentStatus == 34 && message.reference4) {
          const { reference4, reference5 } = message;
          let response;

          if (reference4.includes("PSP")) {
            response = await paymentWayServices.postVentaFacturasMethod({
              productId: reference5.product_id,
              amount: body.amount,
              sellType: "Bill",
              moveTmpBalance: true,
              hash: reference5.hash,
              data: {
                hashEchoData: reference5.hashEchoData,
                reference: reference5.reference,
                cellphone: reference5.phone_number,
              },
              _channel: "web",
            });
          } else if (reference4.includes("RC")) {
            response = await paymentWayServices.postRecargasPaquetesClaroMethod(
              {
                amount: body.amount,
                productId: reference5.product_id,
                moveTmpBalance: true,
                data: {
                  cellphone: reference5.phone_number,
                },
              }
            );
          } else if (reference4.includes("SYA")) {
            response = await paymentWayServices.postVentaSuerteAzarMethod({
              productId: reference5.product_id,
              amount: body.amount,
              document: reference5.document,
              cellphone: reference5.phone_number,
            });
          } else if (reference4.includes("PIN")) {
            response = await paymentWayServices.postVentaPines({
              productId: reference5.product_id,
              amount: body.amount,
              data: {
                email: reference5.email,
                cellphone: reference5.phone_number,
              },
            });
          }
          if (response?.Id) {
            const apply = await paymentWayServices.AplicarCompraEfectivo(
              response.Id
            );
            console.log(apply);
            await responseNotification(body.idperson.phone, apply);
          }
        }
        if ([36, 38].includes(paymentStatus)) {
          await responseNotification(body.idperson.phone, body);
        }
        const status = String(statusMap[paymentStatus] || 6);
        const reference2 = message.reference2 || "";
        const paymenttype = Number(body.paymentmethod?.id == 1 ? "2" : "1");

        await TransactionService.updateTransaction(reference2, {
          transaction_status: status,
          id_payment_method: paymenttype,
        });
      }
    }
  }
}
