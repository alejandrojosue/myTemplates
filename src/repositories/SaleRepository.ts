import {apiBaseUrl} from '../config/apiConfig';
import Product from '../models/Product_';
import Sale, {PayMethod, Status} from '../models/Sale_';
import SaleDetail from '../models/SaleDetail_';
import User from '../models/User';
import ErrorHandler from '../util/ErrorHandler';

import ISaleRepository from './ISaleRepository';

export default class SaleRepository implements ISaleRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = apiBaseUrl
  }
  async getAll(): Promise<Sale[]> {
    throw new Error('Method not implemented.');
  }
  async getByDateRange(startDate: string, endDate: string): Promise<Sale[]> {
    throw new Error('Method not implemented.');
  }
  async create(sale: Sale): Promise<Partial<Sale>> {
    try {
      const response = await fetch(`${this.baseUrl}/ventas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sale),
      })

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to create sale. Status: ${response.status}`)
      }

      const createdSale = await response.json()
      return this.mapToSale(createdSale)
    } catch (error) {
      throw new ErrorHandler(`Error creating product: ${error.message}`)
    }
  }
  private mapToSale(item: any): Sale {
    return new Sale(
        item.attributes?.noFactura, PayMethod[item.attributes.metodoPago],
        Status[item.attributes.estado],
        item.attributes.detalleVentas?.map(
            detail => new SaleDetail(
                new Product(detail.producto.data.attributes.id),
                detail.cantidad, detail.precio, detail.isv, detail.descuento)),
        new User(item.attributes.cliente.data.attributes.id),
        new User(item.attributes.vendedor.data.attributes.id))
  }
}
