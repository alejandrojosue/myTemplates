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
      if (localStorage.getItem('companyData')) {
        const companyData = JSON.parse(localStorage.getItem('companyData') + '')
        setState(companyData)
        return;
      }
      setState((prev) => ({...prev, loading: true, error: null}));
      companyRepository.get()
          .then(company => {
            setState({company, loading: false, error: null});
            localStorage.setItem('companyData', JSON.stringify(state));
          })
          .catch(error => {
            setState({company: null, loading: false, error});
            localStorage.removeItem('companyData');
          });
    } catch (error) {
      localStorage.removeItem('companyData');
      setState({
        company: null,
        loading: false,
        // @ts-ignore
        error: error.message || 'Error fetching data'
      });
    }
  }, [])

  return {
    ...state
  }
};

export default useCompanyService