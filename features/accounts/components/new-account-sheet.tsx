/** Core */
import { z } from 'zod';

/** Components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AccountForm } from '@/features/accounts/components/account-form';

/** Hooks */
import { useCreateAccount } from '@/hooks/accounts/api/use-create-account';
import { useNewAccountSheet } from '@/hooks/accounts/use-new-account-sheet';

/** Database */
import { insertAccountSchema } from '@/db/schema';

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccountSheet();
  const mutation = useCreateAccount();

  function handleSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            New Account
          </SheetTitle>

          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>

        <AccountForm onSubmit={handleSubmit} disabled={mutation.isPending} defaultValues={{ name: '' }} />
      </SheetContent>
    </Sheet>
  );
}
