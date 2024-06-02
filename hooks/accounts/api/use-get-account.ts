/** Core */
import { useQuery } from '@tanstack/react-query';

/** Libs */
import { client } from '@/lib/hono';

export function useGetAccount(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['account', { id }],
    async queryFn() {
      const response = await client.api.accounts[':id'].$get({ param: { id } });
      if (!response.ok) {
        throw new Error('Failed to fetch account');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
}
