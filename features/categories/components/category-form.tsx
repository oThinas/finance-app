/** Core */
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/** Components */
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

/** Database */
import { insertCategorySchema } from '@/db/schema';

const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

interface CategoryFormProps {
  onSubmit(values: FormValues): void;
  id?: string;
  defaultValues: FormValues;
  onDelete?(): void;
  disabled?: boolean;
}

export function CategoryForm(props: CategoryFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  });

  function handleSubmit(values: FormValues) {
    props.onSubmit(values);
  }

  function handleDelete() {
    props.onDelete?.();
  }

  return (
    <Form {...form}>
      <form className="space-y-4 pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
              </FormLabel>

              <FormControl>
                <Input
                  {...field} autoComplete="off" disabled={props.disabled}
                  placeholder="e.g. Food, Travel, etc"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={props.disabled}>
          {props.id ? 'Save changes' : 'Create category'}
        </Button>

        {!!props.id && (
          <Button variant="outline" type="button" disabled={props.disabled} className="w-full" onClick={handleDelete}>
            <Trash className="mr-2 size-4" />

            Delete category
          </Button>
        )}
      </form>
    </Form>
  );
}
