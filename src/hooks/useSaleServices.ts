import {useState} from 'react';

import Sale from '../models/Sale_';
import SaleRepository from '../repositories/SaleRepository';

interface IHookState {
  sales: Sale[];
  total: number;
  loading: boolean;
  error: string|null;
}

interface SaleServiceHook {
  getAllSales: () => Promise<void>;
  getByPagination: (pageSize: number, page: number) => Promise<void>;
  getByDateRange: (startDate: string, endDate: string) => Promise<void>;
  getByRTNCustomer: (rtn: string) => Promise<void>;
  createSale: (sale: Sale) => Promise<void>;
  sales: Sale[];
  total: number;
  loading: boolean;
  error: string|null;
}

const useSaleServices = (): SaleServiceHook => {
  const saleRepository = new SaleRepository();
  const [state, setState] = useState<IHookState>({
    sales: [],
    total: 0,
    loading: false,
    error: null,
  });


  const fetchData = async (fetchFunction: () => Promise<Sale[]|Sale>) => {
    try {
      setState((prev) => ({...prev, loading: true, error: null}));
      const data = await fetchFunction();
      const dataArray = Array.isArray(data) ? data : [data];
      setState({
        sales: dataArray,
        total: saleRepository.get(),
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        sales: [],
        loading: false,
        total: 0,
        error: error.message || 'Error fetching data'
      });
    }
  };

  const getAllSales = async () => {
    await fetchData(() => saleRepository.getAll())
  };

  const getByPagination = async (pageSize: number = 25, page: number = 0) => {
    await fetchData(() => saleRepository.getByPagination(pageSize, page))
  };

  const getByDateRange = async (_startDate: string, _endDate: string) => {
    const startDate =
        new Date(new Date(_startDate).setHours(0, 0, 0)).toISOString();
    const endDate =
        new Date(new Date(_endDate).setHours(23, 59, 59)).toISOString();
    await fetchData(() => saleRepository.getByDateRange(startDate, endDate));
  };

  const getByRTNCustomer =
      async (rtn: string) => {
    if (rtn.trim().length < 10 || rtn.trim().length > 14) return;
    await fetchData(() => saleRepository.getByRTNCustomer(rtn.trim()))
  }

  const createSale = async (sale: Sale) => {
    await fetchData(() => saleRepository.create(sale))
  };

  return {
    ...state, getAllSales, getByPagination, createSale, getByDateRange,
        getByRTNCustomer
  }
};

export default useSaleServices