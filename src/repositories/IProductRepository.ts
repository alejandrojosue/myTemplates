import Product from '../models/Product_';

export default interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  getBySubcategory(subcategoryName: string): Promise<Product[]>;
  getBySKU(sku: string): Promise<Product[]>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(productId: string, updatedProductData: Partial<Product>):
      Promise<Product>;
}