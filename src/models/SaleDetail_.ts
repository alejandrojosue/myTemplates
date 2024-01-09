import Product from './Product_';

export default class SaleDetail {
  constructor(
      public id: number, public producto: Partial<Product>,
      public cantidad: number, public precio: number, public isv: number,
      public descuento: number) {}
}