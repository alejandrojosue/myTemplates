import Product from '../models/Product_';
import Return, {ReturnStatus} from '../models/Return';
import ReturnDetail from '../models/ReturnDetail';
import User from '../models/user/User';
import ReturnRepository from '../repositories/ReturnRepository';
import dataFetching from '../util/dataFetching';

interface ReturnServiceHook {
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<void>;
  getByPagination: (pageSize: number, page: number) => Promise<void>;
  getByDateRange: (startDate: string, endDate: string) => Promise<void>;
  getByRTNCustomer: (rtn: string) => Promise<void>;
  getByRTNnInvoice: (nInvoice: string) => Promise<void>;
  createReturn: (details: [], noFactura: number) => Promise<void>;
  returns: Return[]|Return;
  loading: boolean;
  error: string|null;
}

const useReturnService = ():
    ReturnServiceHook => {
      const returnRepository = new ReturnRepository();
      const {
        data: returns,
        loading,
        error,
        fetchData,
      } = dataFetching<Return>();


      const getAll = async () => {
        await fetchData(() => returnRepository.getAll())
      };

      const getById = async (id: string) => {
        await fetchData(() => returnRepository.getById(id))
      };
      const getByPagination = async () => {

      };
      const getByDateRange = async (_startDate: string, _endDate: string) => {
        const startDate =
            new Date(new Date(_startDate).setHours(0, 0, 0)).toISOString();
        const endDate =
            new Date(new Date(_endDate).setHours(23, 59, 59)).toISOString();
        await fetchData(
            () => returnRepository.getByDateRange(startDate, endDate))
      };
      const getByRTNCustomer = async () => {

      };
      const getByRTNnInvoice = async () => {

      };
      const createReturn =
          async (details: [], noFactura: number) => {
        if (!details.length) {
          alert('Aún no ha añadido ningún valor a la lista!')
          return
        }
        if (details.find(({motivo}) => motivo === '')) {
          alert('Debe ingresar todos los motivos de devolución!')
          return
        }
        const detalleDevoluciones =
            details.map(({producto, cantidad, motivo}) => {
              const {id} = producto;
              return new ReturnDetail(new Product(id), cantidad, motivo)
            });

        const _return = new Return(
            0, '', ReturnStatus['Entregada'], new User(1), noFactura,
            detalleDevoluciones);

        await fetchData(() => returnRepository.create(_return));
        setTimeout(() => window.location.href = '/returns', 1000)
      }

      return {
        returns, loading, error, getAll, getById, getByPagination,
            getByDateRange, getByRTNCustomer, getByRTNnInvoice, createReturn,
      }
    }

export default useReturnService