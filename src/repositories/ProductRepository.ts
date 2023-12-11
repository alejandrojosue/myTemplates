import {apiBaseUrl} from '../config/apiConfig'
import Product from '../models/Product_'
import ErrorHandler from '../util/ErrorHandler'

import IProductRepository from './IProductRepository'

class ProductRepository implements IProductRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = apiBaseUrl
  }

  async getAll(): Promise<Product[]> {
    try {
      const response =
          await fetch(`${this.baseUrl}/productos?populate=*&sort=existencia`)
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to fetch data. Status: ${response.status}`,
            response.status.toString())
      }

      const {data} = await response.json()
      return data.map((item: any) => this.mapToProduct(item))
    } catch (error) {
      throw new ErrorHandler(`Error fetching data: ${error.message}`)
    }
  }

  async getByDateRange(startDate: string, endDate: string): Promise<Product[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/products?date_gte=${startDate}&date_lte=${endDate}`)
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to fetch data. Status: ${response.status}`)
      }

      const data = await response.json()
      return data.map((item: any) => this.mapToProduct(item))
    } catch (error) {
      throw new ErrorHandler(`Error fetching data: ${error.message}`)
    }
  }

  async getBySubcategory(subcategoryName: string): Promise<Product[]> {
    try {
      const response = await fetch(
          `${this.baseUrl}/products?nombre_subcategoria=${subcategoryName}`)
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to fetch data. Status: ${response.status}`)
      }

      const data = await response.json()
      return data.map((item: any) => this.mapToProduct(item))
    } catch (error) {
      throw new ErrorHandler(`Error fetching data: ${error.message}`)
    }
  }

  async getBySKU(sku: string): Promise<Product[]> {
    try {
      const response = await fetch(`${
          this.baseUrl}productos?filters[$and][0][existencia][$gt]=0&filters[$and][1][activo][$eq]=true&filters[$and][2][codigo]=${
          sku}`)
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to fetch data. Status: ${response.status}`,
            response.status.toString())
      }

      const {data} = await response.json()
      return data.map((item: any) => this.mapToProduct(item))
    } catch (error) {
      throw new ErrorHandler(`Error fetching data: ${error.message}`)
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to create product. Status: ${response.status}`)
      }

      const createdProduct = await response.json()
      return this.mapToProduct(createdProduct)
    } catch (error) {
      throw new ErrorHandler(`Error creating product: ${error.message}`)
    }
  }

  async updateProduct(productId: string, updatedProductData: Partial<Product>):
      Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      })

      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to update product. Status: ${response.status}`)
      }

      const updatedProduct = await response.json()
      return this.mapToProduct(updatedProduct)
    } catch (error) {
      throw new ErrorHandler(`Error updating product: ${error.message}`)
    }
  }

  private mapToProduct(item: any): Product {
    return new Product(
        item.id, item.attributes?.codigo, item.attributes?.existencia,
        item.attributes?.precio_venta, item.attributes?.precio_compra,
        item.attributes?.isv, item.attributes?.descuento, item.subcategoria,
        item.attributes?.nombre, item.attributes?.activo,
        item.attributes?.descripcion,
        item.attributes?.img?.data?.attributes?.url ?
            item.attributes?.img?.data?.attributes?.url :
            item.attributes?.img?.data?.attributes?.formats?.thumbnail?.url)
  }
}

export default ProductRepository