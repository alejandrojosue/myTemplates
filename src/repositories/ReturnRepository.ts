// @ts-ignore
import {apiBaseUrl} from '../config/apiConfig'
import Product from '../models/Product_';
import Return, {ReturnStatus} from '../models/Return';
import ReturnDetail from '../models/ReturnDetail';
import User from '../models/user/User';
import ErrorHandler from '../util/ErrorHandler';

import IReturnRepository from './IReturnRepository';

export default class ReturnRepository implements IReturnRepository {
  private baseUrl: string;
  private readonly prevEndpoint: string =
      'devolucions?populate=vendedor,noFactura.cliente,detalleDevoluciones.producto';
  private readonly token = sessionStorage.getItem('daiswadod');
  constructor() {
    this.baseUrl = apiBaseUrl
  }

  async getAll(): Promise<Return[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/${this.prevEndpoint}&sort=id:DESC`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}});
      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get returns. Status: ${response.statusText}`)
      }
      const {data} = await response.json();
      return data.map((item: any) => this.mapToReturn(item))
    } catch (error) {
      throw error
    }
  }
  async getById(id: string): Promise<Return> {
    try {
      const response = await fetch(
          `${this.baseUrl}/devolucions/${
              id}?populate=vendedor,noFactura.cliente,detalleDevoluciones.producto`,
          {method: 'GET', headers: {Authorization: `Bearer ${this.token}`}});
      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para acceder a este módulo!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get returns. Status: ${response.statusText}`)
      }
      const {data} = await response.json();

      return this.mapToReturn(data)
    } catch (error) {
      throw error
    }
  }
  async getByNInvoice(nInvoice: string): Promise<Return> {
    throw new Error('Method not implemented.');
  }
  async getByDateRange(startDate: string, endDate: string): Promise<Return[]> {
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
            `Failed to get returns. Status: ${response.status}`)
      }

      const {data} = await response.json();
      return data.map((item: any) => this.mapToReturn(item))
    } catch (error) {
      throw error
    }
  }
  async getByPagination(pageSize: number, page: number): Promise<Return[]> {
    throw new Error('Method not implemented.');
  }
  async getByRTNCustomer(rtn: string): Promise<Return[]> {
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
            `Failed to get returns. Status: ${response.status}`)
      }

      const {data, meta} = await response.json();

      return data.map((item: any) => this.mapToReturn(item))
    } catch (error) {
      throw error
    }
  }
  async create(_return: Return): Promise<Return> {
    try {
      const response = await fetch(`${this.baseUrl}/devolucions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: _return}),
      })

      if (response.status == 401 || response.status == 403) {
        throw new ErrorHandler(`No tiene permiso para crear Devoluciones!`)
      }

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to create return. Status: ${response.status}`)
      }

      const createdReturn = await response.json()
      alert('Devolución Creada Exitósamente!')
      return this.mapToReturn(createdReturn)
    } catch (error) {
      throw error
    }
  }

  private mapToReturn(item: any) {
    return new Return(
        item.id,
        new Date(item.attributes.createdAt)
            .toLocaleDateString(
                'es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}),
        ReturnStatus[item.attributes.estado],
        new User(
            item.attributes.vendedor.data.id, '',
            item.attributes.vendedor.data.attributes.nombre,
            item.attributes.vendedor.data.attributes.apellido),
        item.attributes.noFactura.data.attributes.noFactura,
        item.attributes.detalleDevoluciones.map(
            (detail: any) => new ReturnDetail(
                new Product(
                    detail.producto.data.id,
                    detail.producto.data.attributes.codigo, 0, 0, 0, 0, 0, [],
                    detail.producto.data.attributes.nombre),
                detail.cantidad, detail.motivo)),
        new User(
            item.attributes.noFactura.data.attributes.cliente.data.id, '',
            item.attributes.noFactura.data.attributes.cliente.data.attributes
                .nombre,
            item.attributes.noFactura.data.attributes.cliente.data.attributes
                .apellido,
            item.attributes.noFactura.data.attributes.cliente.data.attributes
                .RTN))
  }
}