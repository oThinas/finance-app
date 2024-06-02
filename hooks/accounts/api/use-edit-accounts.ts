/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.accounts[':id']['$patch']>['json'];
type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$patch']>;

export function useEditAccount(id?: string) {
  const queryClient = useQueryClient();
  const mutatation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Updating account...', 'update-account');

      const response = await client.api.accounts[':id'].$patch({
        json,
        param: { id },
      });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Account updated', 'update-account');
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: invalidate transactions and summary query
    },
    onError() {
      toast.error('Failed to update account', 'update-account');
    },
  });

  return mutatation;
}
