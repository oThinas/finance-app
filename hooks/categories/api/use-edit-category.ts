/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.categories[':id']['$patch']>['json'];
type ResponseType = InferResponseType<typeof client.api.categories[':id']['$patch']>;

export function useEditCategory(id?: string) {
  const queryClient = useQueryClient();
  const mutatation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Updating category...', 'update-category');

      const response = await client.api.categories[':id'].$patch({
        json,
        param: { id },
      });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Category updated', 'update-category');
      queryClient.invalidateQueries({ queryKey: ['category', { id }] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // TODO: invalidate transactions and summary query
    },
    onError() {
      toast.error('Failed to update category', 'update-category');
    },
  });

  return mutatation;
}
