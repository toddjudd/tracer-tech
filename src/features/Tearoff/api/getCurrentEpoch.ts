import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

import { Epoch } from '../types';

export const getCurrentEpoch = (): Promise<Epoch> => {
  return axios.get(`/b4d8ba8ce6bc923d9080ad0d56ecc723/epoch_data`);
};

export const useCurrentEpoch = () => {
  return useQuery({
    // ...config,
    queryKey: ['currentEpoch'],
    queryFn: () => getCurrentEpoch(),
  });
};
