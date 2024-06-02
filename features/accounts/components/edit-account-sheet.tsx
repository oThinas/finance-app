/** Core */
import { z } from 'zod';

/** Components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { AccountForm } from '@/features/accounts/components/account-form';

/** Hooks */
import { useDeleteAccount } from '@/hooks/accounts/api/use-delete-accounts';
import { useEditAccount } from '@/hooks/accounts/api/use-edit-accounts';
import { useGetAccount } from '@/hooks/accounts/api/use-get-account';
import { useOpenAccountSheet } from '@/hooks/accounts/use-open-account-sheet';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

/** Database */
import { insertAccountSchema } from '@/db/schema';

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccountSheet();
  const [ConfirmDialog, confirm] = useConfirmDialog({ message: 'You are about to delete this account' });

  const accountQuery = useGetAccount(id);
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const defaultValues = accountQuery.data ? { name: accountQuery.data.name } : { name: '' };

  function handleSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  async function handleDelete() {
    const ok = await confirm();
    if (ok) deleteMutation.mutate(undefined, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <>
      <ConfirmDialog />

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Account
            </SheetTitle>

            <SheetDescription>
              Edit an existing account.
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="flex flex-col gap-2 pt-8">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-7" />
              <Skeleton className="h-7" />
            </div>
          ) : (
            <AccountForm
              id={id} disabled={isPending} defaultValues={defaultValues}
              onSubmit={handleSubmit} onDelete={handleDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
