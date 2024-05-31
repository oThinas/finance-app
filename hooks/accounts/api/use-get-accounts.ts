/** Core */
import { useQuery } from '@tanstack/react-query';

/** Libs */
import { client } from '@/lib/hono';

export function useGetAccounts() {
  const query = useQuery({
    queryKey: ['accounts'],
    async queryFn() {
      const response = await client.api.accounts.$get();
      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
}
