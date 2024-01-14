import {useState} from 'react';

import Category from '../models/Category';
import Subcategory from '../models/Subcategory';
import SubcategoryRepository from '../repositories/SubcategoryRepository';

interface IHookState {
  subcategories: Subcategory[];
  categories: Category[];
  subcategoriesTemp: Subcategory[];
  loading: boolean;
  error: string|null;
}

interface SubcategoryServiceHook {
  getAll: () => void;
  handleSubcategoriesList: (categoryName: string) => void;
  subcategories: Subcategory[];
  subcategoriesTemp: Subcategory[];
  categories: Category[];
  loading: boolean;
  error: string|null;
}

const useProductService = (): SubcategoryServiceHook => {
  const subcategoryRepository = new SubcategoryRepository();
  const [state, setState] = useState<IHookState>({
    subcategories: [],
    subcategoriesTemp: [],
    categories: [],
    loading: false,
    error: null,
  });

  const getAll = async () => {
    try {
      setState((prev) => ({...prev, loading: true, error: null}));
      const categories = await subcategoryRepository.getAllCategories()
      const subcategories = await subcategoryRepository.getSubcategories()
      setState({
        subcategories: [],
        subcategoriesTemp: subcategories,
        categories,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        subcategories: [],
        categories: [],
        subcategoriesTemp: [],
        loading: false,
        error: error.message || 'Error fetching data'
      });
    }
  };

  const handleSubcategoriesList = (categoryName: string) => {
    const subcategories = state.subcategoriesTemp.filter(
        subcategory => subcategory.categoria.name === categoryName);
    setState(prev => ({...prev, subcategories}));
  };

  return {
    ...state, getAll, handleSubcategoriesList
  }
};

export default useProductService