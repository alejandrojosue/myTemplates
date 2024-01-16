import {useState} from 'react';

import Return from '../models/Return';
import ReturnRepository from '../repositories/ReturnRepository';

interface IHookState {
  returns: Return[];
  loading: boolean;
  error: string|null;
}

interface ReturnServiceHook {
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  getByPagination: (pageSize: number, page: number) => Promise<void>;
  getByDateRange: (startDate: string, endDate: string) => Promise<void>;
  getByRTNCustomer: (rtn: string) => Promise<void>;
  getByRTNnInvoice: (nInvoice: string) => Promise<void>;
  createReturn: (_return: Return) => Promise<void>;
  returns: Return[];
  loading: boolean;
  error: string|null;
}

const useReturnService = ():
    ReturnServiceHook => {
      const returnRepository = new ReturnRepository();
      const [state, setState] = useState<IHookState>({
        returns: [],
        loading: false,
        error: null,
      });

      const fetchData =
          async (fetchFunction: () => Promise<Return[]|Return>) => {
        try {
          setState((prev) => ({...prev, loading: true, error: null}));
          const data = await fetchFunction();
          const dataArray = Array.isArray(data) ? data : [data];
          setState({returns: dataArray, loading: false, error: null});
        } catch (error) {
          setState({
            returns: [],
            loading: false,
            error: error.message || 'Error fetching data'
          });
        }
      };

      const getAll = async () => {
        await fetchData(() => returnRepository.getAll())
      };

      const getById = async (id: string) => {
        await fetchData(() => returnRepository.getById(id))
      };
      const getByPagination = async () => {

      };
      const getByDateRange = async () => {

      };
      const getByRTNCustomer = async () => {

      };
      const getByRTNnInvoice = async () => {

      };
      const createReturn =
          async () => {

      }

      return {
        ...state, getAll, getById, getByPagination, getByDateRange,
            getByRTNCustomer, getByRTNnInvoice, createReturn,
      }
    }

export default useReturnService