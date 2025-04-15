export interface IPaymentLink {
    amount: number; 
    descripcion: string; 
    currency: string;
    id_form: number; 
    fecha_vencimiento: string; 
    status: boolean;
    services?: number[];
    additionaldata?: any
}