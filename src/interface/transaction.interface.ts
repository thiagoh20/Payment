export interface ITransaction {
  id_user: number;
  id_product: number;
  id_payment_method: number;
  id_supplier?: number;
  id_status_transaction: number;
  amount_product: number;
  amount_transaction: number;
  id_type_money: number;
  payment_reference_supplier?: string;
  const_tx?: number;
  revenue_tx?: number;
  payload: string;
}
