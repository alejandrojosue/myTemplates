import {useState} from 'react';

import Product from '../models/Product_';
import ProductRepository from '../repositories/ProductRepository';

interface IHookState {
  products: Product[];
  loading: boolean;
  error: string|null;
}

interface ProductServiceHook {
  getAllProducts: () => Promise<void>;
  getById: (id: string) => void;
  getProductsBySubcategory: (subcategoryName: string) => Promise<void>;
  getProductsBySKU: (sku: string) => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  updateProduct:
      (productId: string,
       updatedProductData: Partial<Product>) => Promise<void>;
  products: Product[];
  loading: boolean;
  error: string|null;
}

const useProductService = (): ProductServiceHook => {
  const productRepository = new ProductRepository()
  const [state, setState] = useState<IHookState>({
    products: [],
    loading: false,
    error: null,
  })
  const fetchData = async (fetchFunction: () => Promise<Product[]|Product>) => {
    try {
      setState((prev) => ({...prev, loading: true, error: null}));
      const data = await fetchFunction();
      const dataArray = Array.isArray(data) ? data : [data];
      setState({products: dataArray, loading: false, error: null});
    } catch (error) {
      setState({
        products: [],
        loading: false,
        error: error.message || 'Error fetching data'
      });
    }
  };

  const getAllProducts = async () => {
    await fetchData(() => productRepository.getAll());
  };

  const getById = (id: string) => {
    fetchData(() => productRepository.getById(id));
  };

  const getProductsBySubcategory = async (subcategoryName: string) => {
    await fetchData(() => productRepository.getBySubcategory(subcategoryName));
  };

  const getProductsBySKU = async (sku: string) => {
    await fetchData(() => productRepository.getBySKU(sku));
  };

  const createProduct = async (product: Product) => {
    await fetchData(() => productRepository.createProduct(product));
  };

  const updateProduct =
      async (productId: string, updatedProductData: Partial<Product>) => {
    await fetchData(
        () => productRepository.updateProduct(productId, updatedProductData));
  };
  return {
    ...state,
    getAllProducts,
    getById,
    getProductsBySubcategory,
    getProductsBySKU,
    createProduct,
    updateProduct
  };
};

export default useProductService;