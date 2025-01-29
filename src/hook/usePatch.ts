import { BASE_URL } from '@/utils/config';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function usePatch<TRequestBody = unknown, TResponse = unknown>(
  endPoint: string,
) {
  const patchFn = async (data: TRequestBody): Promise<TResponse> => {
    console.log(BASE_URL, endPoint, 'PATCH request to endpoint');
    try {
      const response = await axios.patch<TResponse>(
        `${BASE_URL}/${endPoint}`,
        data,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'An error occurred';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred');
    }
  };

  return useMutation<TResponse, Error, TRequestBody>({
    mutationFn: (data) => patchFn(data),
  });
}
