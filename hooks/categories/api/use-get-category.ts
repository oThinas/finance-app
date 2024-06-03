/** Core */
import { useQuery } from '@tanstack/react-query';

/** Libs */
import { client } from '@/lib/hono';

export function useGetCategory(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ['category', { id }],
    async queryFn() {
      const response = await client.api.categories[':id'].$get({ param: { id } });
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
}
