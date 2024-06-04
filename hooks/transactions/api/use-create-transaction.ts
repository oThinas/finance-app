/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.transactions.$post>['json'];
type ResponseType = InferResponseType<typeof client.api.transactions.$post>;

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Creating transaction...', 'create-transaction');
      const response = await client.api.transactions.$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Transaction created', 'create-transaction');
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to create transaction', 'create-transaction');
    },
  });

  return mutation;
}
