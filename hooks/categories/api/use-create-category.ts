/** Core */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from 'hono';

/** Libs */
import { client } from '@/lib/hono';
import { toast } from '@/lib/toast';

type RequestType = InferRequestType<typeof client.api.categories.$post>['json'];
type ResponseType = InferResponseType<typeof client.api.categories.$post>;

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const mutatation = useMutation<ResponseType, Error, RequestType>({
    async mutationFn(json) {
      toast.loading('Creating category...', 'create-category');
      const response = await client.api.categories.$post({ json });
      const data = await response.json();

      return data;
    },
    onSuccess() {
      toast.success('Category created', 'create-category');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError() {
      toast.error('Failed to create category', 'create-category');
    },
  });

  return mutatation;
}
