import {useEffect, useState} from 'react';

import Company from '../models/Company';
import CompanyRepository from '../repositories/CompanyRepository';
import {isCompany} from '../types/validation-type';


interface IHookState {
  company: Company|null;
  loading: boolean;
  error: string|null;
}

const useCompanyService = () => {
  const companyRepository = new CompanyRepository();
  const [state, setState] = useState<IHookState>({
    company: null,
    loading: false,
    error: null,
  });

  const getCompany =
      async () => {
    const company = await companyRepository.get()
    if (isCompany(company)) {
      setState({company, loading: false, error: null});
    }
    else {
      setState({
        company: null,
        loading: false,
        // @ts-ignore
        error: error.message || 'Error fetching data'
      });
    }
  }

  useEffect(() => {getCompany()}, [])

  return {
    ...state
  }
};

export default useCompanyService