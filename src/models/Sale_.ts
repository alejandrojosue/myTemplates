import SaleDetail from './SaleDetail_';
import User from './User';

export default class Sale {
  constructor(
      public noFactura: number, public metodoPago: PayMethod,
      public estado: Status, public detalleVentas: Array<SaleDetail>,
      public cliente: Partial<User>, public vendedor: Partial<User>) {}
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