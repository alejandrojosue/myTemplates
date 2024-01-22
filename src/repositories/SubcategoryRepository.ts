// @ts-ignore
import {apiBaseUrl} from '../config/apiConfig'
import Category from '../models/Category'
import Subcategory from '../models/Subcategory'
import ErrorFetch from '../util/ErrorFetch'
import ErrorHandler from '../util/ErrorHandler'

import ISaleRepository from './ISubcategoryRepository'

export default class SubcategoryRepository implements ISaleRepository {
  private baseUrl: string;

  constructor() {
    this.baseUrl = apiBaseUrl
  }
  async getSubcategories(): Promise<Subcategory[]> {
    try {
      const response =
          await fetch(`${this.baseUrl}/subcategorias?populate=categoria`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get Subcategories. Status: ${response.statusText}`,
            response.status.toString())
      }

      const {data} = await response.json()
      return data.map((item: any) => this.mapToSubcategory(item))
    } catch (error) {
      if (error instanceof ErrorHandler) throw error
        // @ts-ignores
        else throw new ErrorFetch(error.message)
    }
  }
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to get Subcategories. Status: ${response.statusText}`,
            response.status.toString())
      }

      const {data} = await response.json()
      return data.map((item: any) => this.mapToCategory(item))
    } catch (error) {
      if (error instanceof ErrorHandler) throw error
        // @ts-ignore
        else throw new ErrorFetch(error.message)
    }
  }

  private mapToSubcategory = (item: any):
      Subcategory => {
        return new Subcategory(
            item.attributes.nombre, item.id,
            new Category(item.attributes.categoria.data.attributes.nombre))
      }

  private mapToCategory = (item: any): Category => {
    return new Category(item.attributes.nombre, item.attributes.descripcion)
  }
}