import {useEffect, useState} from 'react';

import Company from '../models/Company';
import CompanyRepository from '../repositories/CompanyRepository';


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

  useEffect(() => {
    try {
      setState((prev) => ({...prev, loading: true, error: null}));
      companyRepository.get()
          .then(company => {setState({company, loading: false, error: null})})
          .catch(error => {setState({company: null, loading: false, error})});
    } catch (error) {
      setState({
        company: null,
        loading: false,
        error: error.message || 'Error fetching data'
      });
    }
  }, [])

  return {
    ...state
  }
};

export default useCompanyService