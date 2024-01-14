import Category from '../models/Category';
import Subcategory from '../models/Subcategory'

export default interface ISaleRepository {
  getSubcategories(): Promise<Subcategory[]>;
  getAllCategories(): Promise<Category[]>;
}