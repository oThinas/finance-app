/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.categories['bulk-delete']['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.categories['bulk-delete']['$post']>;

export function useBulkDeleteCategories() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Deleting categories...', 'bulk-delete-categories');
      const response = await client.api.categories['bulk-delete'].$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Categories deleted', 'bulk-delete-categories');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to delete categories', 'bulk-delete-categories');
    },
  });

  return mutation;
}
