import SaleDetail from './SaleDetail_';
import User from './user/User';

export default class Sale {
  constructor(
      public id: number, public noFactura: number, public metodoPago: PayMethod,
      public estado: Status, public detalleVentas: Array<SaleDetail>,
      public cliente: Partial<User>, public vendedor: Partial<User>,
      public fecha: string) {}
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