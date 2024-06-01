/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.accounts['bulk-delete']['$post']>['json'];
type ResponseType = InferResponseType<typeof client.api.accounts['bulk-delete']['$post']>;

export function useBulkDeleteAccounts() {
  const queryClient = useQueryClient();
  const mutatation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      const response = await client.api.accounts['bulk-delete'].$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Accounts deleted');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: invalidate summary query
    },
    onError() {
      toast.error('Failed to delete accounts');
    },
  });

  return mutatation;
}
