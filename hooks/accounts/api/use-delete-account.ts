/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type ResponseType = InferResponseType<typeof client.api.accounts[':id']['$delete']>;

export function useDeleteAccount(id?: string) {
  const queryClient = useQueryClient();
  const mutatation = useMutation<ResponseType, Error>({
    async mutationFn() {
      toast.loading('Deleting account...', 'delete-account');

      const response = await client.api.accounts[':id'].$delete({ param: { id } });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Account deleted', 'delete-account');
      queryClient.invalidateQueries({ queryKey: ['account', { id }] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      // TODO: invalidate transactions and summary query
    },
    onError() {
      toast.error('Failed to delete account', 'delete-account');
    },
  });

  return mutatation;
}
