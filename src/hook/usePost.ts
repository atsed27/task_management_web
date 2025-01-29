import { BASE_URL } from '@/utils/config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function usePost<TRequestBody = unknown, TResponse = unknown>(
  endPoint: string,
) {
  const postFn = async (data: TRequestBody): Promise<TResponse> => {
    console.log(BASE_URL, endPoint, 'endPoint');
    try {
      const response = await axios.post<TResponse>(
        `${BASE_URL}/${endPoint}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.log('error', error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  };

  return useMutation<TResponse, Error, TRequestBody>({
    mutationFn: (data) => postFn(data),
  });
}
