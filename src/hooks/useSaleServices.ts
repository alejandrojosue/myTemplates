import {useEffect, useState} from 'react';

import Sale from '../models/Sale_';
import SaleRepository from '../repositories/SaleRepository';

interface IHookState {
  sales: Sale[];
  loading: boolean;
  error: string|null;
}

interface SaleServiceHook {
  getAllSales: () => Promise<void>;
  createSale: (sale: Sale) => Promise<void>;
  getTotalSales: () => Promise<void>;
  total: number;
  sales: Sale[];
  loading: boolean;
  error: string|null;
}

const useSaleServices = (): SaleServiceHook => {
  const saleRepository = new SaleRepository();
  const [state, setState] = useState<IHookState>({
    sales: [],
    loading: false,
    error: null,
  });

  const [total, setTotal] = useState(0)

  const fetchData = async (fetchFunction: () => Promise<Sale[]|Sale>) => {
    try {
      setState((prev) => ({...prev, loading: true, error: null}));
      const data = await fetchFunction();
      const dataArray = Array.isArray(data) ? data : [data];
      setState({sales: dataArray, loading: false, error: null});
    } catch (error) {
      setState({
        sales: [],
        loading: false,
        error: error.message || 'Error fetching data'
      });
    }
  };

  const getAllSales = async () => {
    await fetchData(() => saleRepository.getAll())
  };

  const createSale = async (sale: Sale) => {
    await fetchData(() => saleRepository.create(sale))
  };

  const getTotalSales =
      async () => {
    try {
      await saleRepository.getTotal()
          .then(response => setTotal(response))
          .catch(error => alert(error.message))
    } catch (error) {
    }
  }

  return {
    ...state, total, getAllSales, createSale, getTotalSales
  }
};

export default useSaleServices