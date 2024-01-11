import Sale from '../models/Sale_';

export default interface ISaleRepository {
  getAll(): Promise<Sale[]>;
  getByDateRange(startDate: string, endDate: string): Promise<Sale[]>;
  getByPagination(pageSize: number, page: number): Promise<Sale[]>;
  getByRTNCustomer(rtn: string): Promise<Sale[]>;
  create(sale: Sale): Promise<Partial<Sale>>;
}