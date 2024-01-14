import {apiBaseUrl} from '../config/apiConfig'
import Product from '../models/Product_'
import Sale, {PayMethod, Status} from '../models/Sale_'
import SaleDetail from '../models/SaleDetail_'
import User from '../models/user/User';
import ErrorHandler from '../util/ErrorHandler'

import ISaleRepository from './ISaleRepository'

export default class SaleRepository implements ISaleRepository {
  private baseUrl: string;
  private readonly prevEndpoint: string =
      'ventas?populate=cliente,detalleVentas.producto,vendedor';
  private readonly token = sessionStorage.getItem('daiswadod');
  private total: number;

  constructor() {
    this.baseUrl = apiBaseUrl;
  }
  async getByNInvoice(nInvoice: string): Promise<Sale> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${this.prevEndpoint}&filters[noFactura]=${nInvoice}`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}});
      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sales. Status: ${response.statusText}`)
      }

      const {data} = await response.json();

      return data.map((item: any) => this.mapToSale(item))

    } catch (error) {
      throw error
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

      const {data, meta} = await response.json();
      this.total = meta.pagination.total;

      return data.map((item: any) => this.mapToSale(item))

    } catch (error) {
      throw error
    }
  }

  async getById(id: string): Promise<Sale> {
    try {
      const response = await fetch(
          `${this.baseUrl}/ventas/${
              id}?populate=cliente,detalleVentas.producto,vendedor`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}});
      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sale. Status: ${response.statusText}`)
      }

      const {data} = await response.json();
      return this.mapToSale(data)

    } catch (error) {
      throw error
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<Sale[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${
              this.prevEndpoint}&filters[$and][0][createdAt][$gte]=${
              startDate}&filters[$and][1][createdAt][$lte]=${
              endDate}&sort=id:DESC`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}})

      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sales. Status: ${response.status}`)
      }

      const {data, meta} = await response.json();
      this.total = meta.pagination.total;
      return data.map((item: any) => this.mapToSale(item))
    } catch (error) {
      throw error
    }
  }

  async getByPagination(pageSize: number = 25, page: number = 1):
      Promise<Sale[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${this.prevEndpoint}&pagination[pageSize]=${
              pageSize}&pagination[page]=${page}&sort=id:DESC`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}})

      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sales. Status: ${response.status}`)
      }

      const {data, meta} = await response.json();
      this.total = meta.pagination.total;

      return data.map((item: any) => this.mapToSale(item))
    } catch (error) {
      throw error
    }
  }

  async getByRTNCustomer(rtn: string): Promise<Sale[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${
              this.prevEndpoint}&filters[$and][0][cliente][RTN][$eq]=${
              rtn}&sort=noFactura:DESC`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}})

      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get sales. Status: ${response.status}`)
      }

      const {data, meta} = await response.json();
      this.total = meta.pagination.total;

      return data.map((item: any) => this.mapToSale(item))
    } catch (error) {
      throw error
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

      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to create sale. Status: ${response.status}`)
      }

      const createdSale = await response.json()
      return this.mapToSale(createdSale)
    } catch (error) {
      throw error
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

  public get(): number {
    return this.total;
  }
}
