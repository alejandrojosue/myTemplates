export default class SaleDetail {
  id: Number
  productSku: String
  productName: String
  quantity: Number
  unitPrice: Number
  discount: Number
  tax: Number
  constructor(
      id: Number, productSku: String, productName: String, quantity: Number,
      unitPrice: Number, discount: Number, tax: Number) {
    this.id = id;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.discount = discount;
    this.tax = tax;
    this.productSku = productSku;
    this.productName = productName;
  }
}