/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.accounts.$post>['json'];
type ResponseType = InferResponseType<typeof client.api.accounts.$post>;

export function useCreateAccount() {
  const queryClient = useQueryClient();
  const mutatation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Creating account...', 'create-account');
      const response = await client.api.accounts.$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Account created', 'create-account');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError() {
      toast.error('Failed to create account', 'create-account');
    },
  });

  return mutatation;
}
