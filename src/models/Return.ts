import ReturnDetail from './ReturnDetail';
import User from './user/User';

export default class Return {
  constructor(
      public id: number, public fecha: string, public estado: ReturnStatus,
      public vendedor: Partial<User>, public noFactura: number,
      public detalleDevoluciones: Array<ReturnDetail>) {}
}

export enum ReturnStatus {
  'En proceso' = 'En proceso',
  Entregada = 'Entregada',
  Cancelada = 'Cancelada'
}