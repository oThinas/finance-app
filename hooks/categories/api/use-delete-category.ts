/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type ResponseType = InferResponseType<typeof client.api.categories[':id']['$delete']>;

export function useDeleteCategory(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    async mutationFn() {
      toast.loading('Deleting category...', 'delete-category');

      const response = await client.api.categories[':id'].$delete({ param: { id } });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Category deleted', 'delete-category');
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError() {
      toast.error('Failed to delete category', 'delete-category');
    },
  });

  return mutation;
}
