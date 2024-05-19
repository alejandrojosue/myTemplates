import {useState} from 'react';

interface IDataFetchState<T> {
  data: T[]|T;
  temp: T[]|T;
  loading: boolean;
  error: string|null;
}

const dataFetching = <T>() => {
  const [state, setState] = useState<IDataFetchState<T>>({
    data: [],
    temp: [],
    loading: false,
    error: null,
  });

  const fetchData = async (fetchFunction: () => Promise<T[]|T>) => {
    try {
      setState((prev) => ({...prev, loading: true, error: null}));
      const data = await fetchFunction();
      setState({data, temp: data, loading: false, error: null});
    } catch (error) {
      setState({
        data: [],
        temp: [],
        loading: false,
      // @ts-ignore
        error: error.message || 'Error fetching data',
      });
    }
  };

  const handleTemp = (data: T[]) => {
    setState((prev) => ({...prev, data}));
  };

  return {...state, fetchData, handleTemp};
};

export default dataFetching;