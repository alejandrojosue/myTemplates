import Subcategoria from './Subcategory';

class Product {
  constructor(
      public id: number, public SKU?: string, public existencia?: number,
      public precio_venta?: number, public precio_compra?: number,
      public isv?: number, public descuento?: number,
      public subcategoria: Array<Subcategoria> = [], public nombre?: string,
      public activo?: productStatus, public descripcion?: string,
      public imgUrl?: String) {}
}

export enum productStatus {
  true = 'Activo',
  false = 'Inactivo'
}

export default Product