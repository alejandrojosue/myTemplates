import Brand from './Brand';
import Subcategory from './Subcategory';

class Product {
  constructor(
      public id: number, public codigo?: string, public existencia?: number,
      public precio_venta?: number, public precio_compra?: number,
      public isv?: number, public descuento?: number,
      public subcategoria: Array<Subcategory> = [], public nombre?: string,
      public activo?: productStatus, public descripcion?: string,
      public imgUrl?: String, public modelo?: string, public marca?: Brand) {}
}

export enum productStatus {
  true = 'Activo',
  false = 'Inactivo'
}

export default Product