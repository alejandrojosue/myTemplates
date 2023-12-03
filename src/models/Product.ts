export default class Product {
  id: Number
  name: String
  sku: String
  description: any
  brandName: String
  tax: Number
  discount: Number
  unitPrice: Number
  cost: Number
  stock: Number
  imgURL: String
  status: productStatus
  constructor(
      id: Number,
      name: String,
      sku: String,
      description: any,
      brandName: String,
      tax: Number,
      discount: Number,
      unitPrice: Number,
      cost: Number,
      stock: Number,
      imgURL: String,
      status: productStatus,
  ) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.description = description;
    this.brandName = brandName;
    this.tax = tax;
    this.discount = discount;
    this.unitPrice = unitPrice;
    this.cost = cost;
    this.stock = stock;
    this.imgURL = imgURL;
    this.status = status;
  }
}

export enum productStatus {
  true = 'Activo',
  false = 'Inactivo'
}