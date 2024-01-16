import Product from './Product_'

export default class ReturnDetail {
  producto: Partial<Product>;
  cantidad: number;
  motivo: string;
  constructor(producto: Partial<Product>, cantidad: number, motivo: string) {
    this.producto = producto;
    this.cantidad = cantidad;
    this.motivo = motivo;
  }
}