import {apiBaseUrl, URL_DEVELOP} from '../config/apiConfig'
import Brand from '../models/Brand'
import Product from '../models/Product_'
import ErrorFetch from '../util/ErrorFetch'
import ErrorHandler from '../util/ErrorHandler'

import IProductRepository from './IProductRepository'

class ProductRepository implements IProductRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = apiBaseUrl
  }
  async getById(id: string): Promise<Product> {
    try {
      const response = await fetch(
          `${this.baseUrl}/productos/${id}?filters[activo]=true&populate=deep`);
      if (response.status == 404) {
        throw new ErrorHandler(
            `Producto no Encontrado.`, response.status.toString())
      }
      if (!response.ok) {
        throw new ErrorHandler(
            `Failed to fetch data. Status: ${response.status}`,
            response.status.toString())
      }

      const {data} = await response.json()
      const product = this.mapToProduct(data);
      return product;
    } catch (error) {
      if (error instanceof ErrorHandler)
        throw error
        else throw new ErrorFetch(error.message)
    }
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
      throw error
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
      throw error
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
      throw error
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
      throw error
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
      throw error
    }
  }

  private mapToProduct(item: any): Product {
    let url = item.attributes?.img?.data?.attributes?.url;

    if (!url) {
      url = item.attributes?.img?.data?.attributes?.formats?.thumbnail?.url
    }

    if (!url.includes('https://')) {
      url = URL_DEVELOP + url
    }

    return new Product(
        item.id, item.attributes?.codigo, item.attributes?.existencia,
        item.attributes?.precio_venta, item.attributes?.precio_compra,
        item.attributes?.isv, item.attributes?.descuento, item.subcategoria,
        item.attributes?.nombre, item.attributes?.activo,
        item.attributes?.descripcion, url, item.attributes.modelo,
        new Brand(
            item.attributes.marca.data.id,
            item.attributes.marca?.data.attributes.nombre))
  }
}

export default ProductRepository