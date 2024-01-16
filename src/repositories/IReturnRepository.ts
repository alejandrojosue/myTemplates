import Return from '../models/Return';

export default interface IReturnRepository {
  getAll(): Promise<Return[]>;
  getById(id: string): Promise<Return>;
  getByNInvoice(nInvoice: string): Promise<Return>;
  getByDateRange(startDate: string, endDate: string): Promise<Return[]>;
  getByPagination(pageSize: number, page: number): Promise<Return[]>;
  getByRTNCustomer(rtn: string): Promise<Return[]>;
  create(_return: Return): Promise<Partial<Return>>;
}