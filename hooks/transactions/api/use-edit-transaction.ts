/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.transactions[':id']['$patch']>['json'];
type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$patch']>;

export function useEditTransaction(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Updating transaction...', 'update-transaction');

      const response = await client.api.transactions[':id'].$patch({
        json,
        param: { id },
      });

      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Transaction updated', 'update-transaction');
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to update transaction', 'update-transaction');
    },
  });

  return mutation;
}
