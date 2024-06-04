/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type ResponseType = InferResponseType<typeof client.api.transactions[':id']['$delete']>;

export function useDeleteTransaction(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    async mutationFn() {
      toast.loading('Deleting transaction...', 'delete-transaction');

      const response = await client.api.transactions[':id'].$delete({ param: { id } });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Transaction deleted', 'delete-transaction');
      queryClient.invalidateQueries({ queryKey: ['transaction', { id }] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to delete transaction', 'delete-transaction');
    },
  });

  return mutation;
}
