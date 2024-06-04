/** Core */

import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */

type RequestType = InferRequestType<typeof client.api.transactions['bulk-create']['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.transactions['bulk-create']['$post']>;

export function useBulkCreateTransactions() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Creating transactions...', 'bulk-create-transactions');
      const response = await client.api.transactions['bulk-create'].$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Transactions created', 'bulk-create-transactions');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to create transactions', 'bulk-create-transactions');
    },
  });

  return mutation;
}
