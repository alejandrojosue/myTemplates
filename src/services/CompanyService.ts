import Company from '../models/Company'
import CompanyRepository from '../repositories/CompanyRepository'
import ErrorHandler from '../util/ErrorHandler'

export default class CompanyService {
  private companyRepository: CompanyRepository

  constructor(companyRepository: CompanyRepository) {
    this.companyRepository = companyRepository
  }

  async getDataCompany(): Promise<Company> {
    try {
      const company = await this.companyRepository.get()
      return company
    } catch (error) {
      throw new ErrorHandler(`Error in CompanyService: ${error.message}`)
    }
  }
}