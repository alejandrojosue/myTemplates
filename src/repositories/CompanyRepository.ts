import {apiBaseUrl} from '../config/apiConfig'
import Company from '../models/Company'
import ErrorFetch from '../util/ErrorFetch'
import ErrorHandler from '../util/ErrorHandler'

export default class CompanyRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = apiBaseUrl
  }

  async get(): Promise<Company> {
    try {
      const response = await fetch(`${this.baseUrl}/empresa`)
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to fetch data. Status: ${response.status}`,
            response.status.toString())
      }

      const {data} = await response.json()
      return this.mapToCompany(data)
    } catch (error) {
      throw new ErrorFetch(`${error.message}`)
    }
  }
  private mapToCompany(item: any): Company {
    return new Company(
        item.attributes.nombre, item.attributes.direccion,
        item.attributes.correo, item.attributes.telefono,
        item.attributes.website, item.attributes.lema, item.attributes.CAI,
        item.attributes.RangoInicial, item.attributes.RangoFinal,
        item.attributes.fechaVencimiento)
  }
}