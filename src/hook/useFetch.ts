import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '@/utils/config';

export function useFetch<T>(
  endPoint: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
) {
  const queryKey: QueryKey = [endPoint];

  const queryFn = async () => {
    const { data } = await axios.get<T>(`${BASE_URL}/${endPoint}`);
    return data;
  };

  return useQuery<T, Error>({
    queryKey,
    queryFn,
    ...options,
  });
}
