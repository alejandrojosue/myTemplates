import {apiBaseUrl} from '../config/apiConfig'
import Product from '../models/Product_'
import Sale, {PayMethod, Status} from '../models/Sale_'
import SaleDetail from '../models/SaleDetail_'
import User from '../models/user/User';
import ErrorHandler from '../util/ErrorHandler'

import ISaleRepository from './ISaleRepository'

export default class SaleRepository implements ISaleRepository {
  private baseUrl: string;
  private prevEndpoint: string =
      'ventas?populate=cliente,detalleVentas.producto,vendedor';
  private token =
      'd2dea4119266c82c9576470edc68f993cf582816b45a7f2cd5c63f3bff14198af369ccf8f3544c5d138bdc6f95d06c052b3e93657e64f8601528a6451662f1cfeee0bf2c784b6ae1bbb1d5e557ed68c0cb49bb0222c2103721e52f465c8a78066042d060b6d615bfdba43b0e8c7185fb595612d3a27551cdd2dc3676568679b9' ||
      sessionStorage.getItem('daiswadod');

  constructor() {
    this.baseUrl = apiBaseUrl
  }
  async getTotal(): Promise<number> {
    try {
      const response = await fetch(
          `${this.baseUrl}/ventas`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}})

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get count sales. Status: ${response.status}`)
      }

      const {meta} = await response.json()
      console.log(meta.pagination.total)
      return meta.pagination.total
    } catch (error) {
      throw new ErrorHandler(`Error getting count sales: ${error.message}`)
    }
  }

  async getAll(): Promise<Sale[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${
              this.prevEndpoint}&pagination[pageSize]=1000&sort=id:DESC`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}});
      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sales. Status: ${response.statusText}`)
      }

      const {data} = await response.json()
      return data.map((item: any) => this.mapToSale(item))

    } catch (error) {
      throw new ErrorHandler(`${error.message}`)
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<Sale[]> {
    throw new Error('Method not implemented.');
  }

  async getByPagination(pageSize: number = 25, page: number = 1):
      Promise<Sale[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${this.prevEndpoint}&pagination[pageSize]=${
              pageSize}&pagination[page]=${page}&sort=id:DESC`,
          {
            method: 'GET',
            headers: {Authorization: `Bearer ${sessionStorage.getItem('jwt')}`}
          })

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sales. Status: ${response.status}`)
      }

      const {data} = await response.json()
      return data.map((item: any) => this.mapToSale(item))
    } catch (error) {
      throw new ErrorHandler(`Error getting sales: ${error.message}`)
    }
  }
  async create(sale: Sale): Promise<Sale> {
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
        item.id, item.attributes?.noFactura,
        PayMethod[item.attributes.metodoPago], Status[item.attributes.estado],
        item.attributes.detalleVentas?.map(
            detail => new SaleDetail(
                detail.id,
                new Product(
                    detail.producto.data.id,
                    detail.producto.data.attributes.codigo, 0, 0, 0, 0, 0, [],
                    detail.producto.data.attributes.nombre),
                detail.cantidad, detail.precio, detail.isv, detail.descuento)),
        new User(
            item.attributes.cliente.data.id, '',
            item.attributes.cliente.data.attributes.nombre,
            item.attributes.cliente.data.attributes.apellido),
        new User(
            item.attributes.vendedor.data.attributes.id, '',
            item.attributes.vendedor.data.attributes.nombre,
            item.attributes.vendedor.data.attributes.apellido),
        new Date(item.attributes.createdAt)
            .toLocaleDateString(
                'es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}))
  }
}
