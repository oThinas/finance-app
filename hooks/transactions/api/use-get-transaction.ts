/** Core */
import { useQuery } from '@tanstack/react-query';

/** Libs */
import { client } from '@/lib/hono';
import { convertAmounFromMiliunits } from '@/lib/utils';

export function useGetTransaction(id?: string) {
  const query = useQuery({
    queryKey: ['transaction', { id }],
    async queryFn() {
      const response = await client.api.transactions[':id'].$get({ param: { id } });
      if (!response.ok) {
        throw new Error('Failed to fetch transaction');
      }

      const { data } = await response.json();

      return { ...data, amount: convertAmounFromMiliunits(data.amount) };
    },
  });

  return query;
}
