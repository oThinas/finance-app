/** Core */
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { MultiValue } from 'react-select';
import { z } from 'zod';

/** Components */
import { AmountInput } from '@/components/ui/amount-input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

/** Database */
import { insertTransactionsSchema } from '@/db/schema';

/** Libs */
import { convertAmounToMiliunits, parseFloatLocale } from '@/lib/utils';

/** Interfaces */
import { ISelectOptions } from '@/interfaces/select-options';

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string()
    .nullable()
    .optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string()
    .nullable()
    .optional(),
});

const apiSchema = insertTransactionsSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;
type APIFormValues = z.input<typeof apiSchema>;

interface TransactionFormProps {
  onSubmit(values: APIFormValues): void;
  accountOptions: ISelectOptions[];
  categoryOptions: ISelectOptions[];
  onCreateCategory(name: string): void;
  onCreateAccount(name: string): void;
  id?: string;
  defaultValues?: FormValues;
  disabled?: boolean;
  onDelete?(): void;
}

export function TransactionForm(props: TransactionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  });

  function handleSubmit(values: FormValues) {
    const amountInMiliunits = convertAmounToMiliunits(parseFloatLocale(values.amount));
    props.onSubmit({ ...values, amount: amountInMiliunits });
  }

  function handleDelete() {
    props.onDelete?.();
  }

  return (
    <Form {...form}>
      <form className="space-y-4 pt-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} disabled={props.disabled} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>
                Account
              </FormLabel>

              <FormControl>
                <Select
                  placeholder="Select an account" options={props.accountOptions} onCreate={props.onCreateAccount}
                  value={field.value as (string & (ISelectOptions | MultiValue<ISelectOptions>)) | null | undefined}
                  onChange={field.onChange} disabled={props.disabled} required
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Category
              </FormLabel>

              <FormControl>
                <Select
                  placeholder="Select an category" options={props.categoryOptions} onCreate={props.onCreateCategory}
                  value={field.value as (string & (ISelectOptions | MultiValue<ISelectOptions>)) | null | undefined}
                  onChange={field.onChange} disabled={props.disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>
                Payee
              </FormLabel>

              <FormControl>
                <Input {...field} disabled={props.disabled} placeholder="Add a payee" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>
                Amount
              </FormLabel>

              <FormControl>
                <AmountInput {...field} disabled={props.disabled} placeholder="0,00" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Notes
              </FormLabel>

              <FormControl>
                <Textarea {...field} value={field.value ?? ''} disabled={props.disabled} placeholder="Optional notes" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={props.disabled}>
          {props.id ? 'Save changes' : 'Create transaction'}
        </Button>

        {!!props.id && (
          <Button variant="outline" type="button" disabled={props.disabled} className="w-full" onClick={handleDelete}>
            <Trash className="mr-2 size-4" />

            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
}
