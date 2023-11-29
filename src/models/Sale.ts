import SaleDetail from './SaleDetail'

export default class Sale {
  id: Number
  date: String
  noInvoice: Number
  status: Status
  payMethod: PayMethod
  customerName: String
  sellerName: String
  details: Array<SaleDetail>

  constructor(
      id: Number, date: String, noInvoice: Number,
      status: Status = Status.Pagada, customerName: String, sellerName: String,
      payMethod: PayMethod = PayMethod.Efectivo, details: Array<SaleDetail>) {
    this.id = id;
    this.date = date;
    this.noInvoice = noInvoice;
    this.status = status;
    this.payMethod = payMethod;
    this.customerName = customerName;
    this.sellerName = sellerName;
    this.details = details;
  }
}

export enum Status {
  Pagada = 'Pagada',
  'No Pagada' = 'No Pagada',
  Anulada = 'Anulada',
  'Parcialmente Pagada' = 'Parcialmente Pagada'
}

export enum PayMethod {
  Efectivo = 'Efectivo',
  'Tarjeta de Crédito' = 'Tarjeta de Crédito',
  'Transferencia Bancaria' = 'Transferencia Bancaria'
}