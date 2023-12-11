import Sale from '../models/Sale_';

export default interface ISaleRepository {
  getAll(): Promise<Sale[]>;
  getByDateRange(startDate: string, endDate: string): Promise<Sale[]>;
  create(sale: Sale): Promise<Partial<Sale>>;
}