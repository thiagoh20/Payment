interface BaseModel {
    productId?: number;
    amount: number;
    cellphone?: string;
    moveTmpBalance?: boolean;
    data?: {
        hashEchoData?: string;
        reference?: string;
        cellphone?: string;
    };
}
interface SellModel extends BaseModel {
    sellType: "Bill" | "OtherSellType";
    hash: string;
    _channel?: string;
}
interface DocumentModel extends BaseModel {
    document: string;
    cellphone: string;
}
interface PaymentModel {
    usuario: string;
    medioPago: "tarjetaCredito" | "efectivo" | "transferencia";
    idTransaccion: string;
}
interface VentaPinesModel extends BaseModel {
    data: {
        email: string;
        cellphone: string;
    };
}
interface RecargasPaquetesClaroModel extends BaseModel {
    moveTmpBalance: boolean;
    data: {
        cellphone: string;
    };
}

interface AplicarCompraEfectivoModel {
    usuario: string; // Cualquier valor definido por el usuario.
    medioPago: string; // Cualquier valor definido por el usuario.
    idTransaccion: string; // Identificador único de la transacción.
}
type GeneralModel = SellModel | DocumentModel | PaymentModel | VentaPinesModel | RecargasPaquetesClaroModel |AplicarCompraEfectivoModel;