/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.transactions['bulk-delete']['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.transactions['bulk-delete']['$post']>;

export function useBulkDeleteTransactions() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Deleting transactions...', 'bulk-delete-transactions');
      const response = await client.api.transactions['bulk-delete'].$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Transactions deleted', 'bulk-delete-transactions');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to delete transactions', 'bulk-delete-transactions');
    },
  });

  return mutation;
}
