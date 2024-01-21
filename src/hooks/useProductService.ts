import Product from '../models/Product_';
import ProductRepository from '../repositories/ProductRepository';
import dataFetching from '../util/dataFetching';

interface ProductServiceHook {
  getAllProducts: () => Promise<void>;
  getById: (id: string) => void;
  getProductsBySubcategory: (subcategoryName: string) => Promise<void>;
  getProductsBySKU: (sku: string) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct:
      (productId: string,
       updatedProductData: Partial<Product>) => Promise<void>;
  handleProductsList: (subcategoryId: number) => void;
  products: Product[]|Product;
  productsTemp: Product[]|Product;
  loading: boolean;
  error: string|null;
}

const useProductService = (): ProductServiceHook => {
  const productRepository = new ProductRepository();
  const {
    data: products,
    temp: productsTemp,
    loading,
    error,
    fetchData,
    handleTemp
  } = dataFetching<Product>();

  const getAllProducts = async () => {
    fetchData(() => productRepository.getAll());
  };

  const getById = (id: string) => {
    fetchData(() => productRepository.getById(id));
  };

  const getProductsBySubcategory = async (subcategoryName: string) => {

  };

  const getProductsBySKU = async (sku: string) => {
    fetchData(() => productRepository.getBySKU(sku));
  };

  const createProduct = async (product: Product) => {
    fetchData(() => productRepository.createProduct(product));
  };

  const updateProduct =
      async (productId: string, updatedProductData: Partial<Product>) => {
    fetchData(
        () => productRepository.updateProduct(productId, updatedProductData));
  };

  const handleProductsList = (subcategoryId: number) => {
    if (productsTemp instanceof Array) {
      const products = productsTemp.filter(
          product => (product.subcategoria.some(
              subcategory => subcategory.id == subcategoryId)));
      handleTemp(products)
    }
  };
  return {
    products,
    productsTemp,
    loading,
    error,
    getAllProducts,
    getById,
    getProductsBySubcategory,
    getProductsBySKU,
    createProduct,
    updateProduct,
    handleProductsList
  };
};

export default useProductService;