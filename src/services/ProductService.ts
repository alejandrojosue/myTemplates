import Product from '../models/Product_'
import ProductRepository from '../repositories/ProductRepository'
import ErrorHandler from '../util/ErrorHandler'

class ProductService {
  private productRepository: ProductRepository

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productRepository.getAll()
      return products
    } catch (error) {
      throw new ErrorHandler(`Error in ProductService: ${error.message}`)
    }
  }

  async getProductsByDateRange(startDate: string, endDate: string):
      Promise<Product[]> {
    try {
      const products =
          await this.productRepository.getByDateRange(startDate, endDate)
      return products
    } catch (error) {
      throw new ErrorHandler(`Error in ProductService: ${error.message}`)
    }
  }

  async getProductsBySubcategory(subcategoryName: string): Promise<Product[]> {
    try {
      const products =
          await this.productRepository.getBySubcategory(subcategoryName)
      return products
    } catch (error) {
      throw new ErrorHandler(`Error in ProductService: ${error.message}`)
    }
  }

  async getProductsBySKU(sku: string): Promise<Product[]> {
    try {
      const products = await this.productRepository.getBySKU(sku)
      return products
    } catch (error) {
      throw new ErrorHandler(`Error in ProductService: ${error.message}`)
    }
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      const createdProduct = await this.productRepository.createProduct(product)
      return createdProduct
    } catch (error) {
      throw new ErrorHandler(`Error in ProductService: ${error.message}`)
    }
  }

  async updateProduct(productId: string, updatedProductData: Partial<Product>):
      Promise<Product> {
    try {
      const updatedProduct = await this.productRepository.updateProduct(
          productId, updatedProductData)
      return updatedProduct
    } catch (error) {
      throw new ErrorHandler(`Error in ProductService: ${error.message}`)
    }
  }
}

export default ProductService
