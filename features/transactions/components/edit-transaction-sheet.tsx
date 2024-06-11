/** Core */
import { z } from 'zod';

/** Components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SkeletonFormSheet } from '@/components/ui/skeleton-form-sheet';
import { TransactionForm } from '@/features/transactions/components/transaction-form';

/** Hooks */
import { useCreateAccount } from '@/hooks/accounts/api/use-create-account';
import { useGetAccounts } from '@/hooks/accounts/api/use-get-accounts';
import { useCreateCategory } from '@/hooks/categories/api/use-create-category';
import { useGetCategories } from '@/hooks/categories/api/use-get-categories';
import { useDeleteTransaction } from '@/hooks/transactions/api/use-delete-transaction';
import { useEditTransaction } from '@/hooks/transactions/api/use-edit-transaction';
import { useGetTransaction } from '@/hooks/transactions/api/use-get-transaction';
import { useOpenTransactionSheet } from '@/hooks/transactions/use-open-transaction-sheet';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

/** Database */
import { insertTransactionsSchema } from '@/db/schema';
import { convertAmounFromMiliunits } from '@/lib/utils';

const formSchema = insertTransactionsSchema.omit({ id: true });
type FormValues = z.input<typeof formSchema>;

export function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransactionSheet();
  const [ConfirmDialog, confirm] = useConfirmDialog({ message: 'You are about to delete this transaction' });

  const transactionQuery = useGetTransaction(id);
  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const categoryOptions = (categoryQuery.data || []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = (accountQuery.data || []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading;

  const isPending = editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const defaultValues = transactionQuery.data ? {
    accountId: transactionQuery.data.accountId,
    categoryId: transactionQuery.data.categoryId,
    amount: convertAmounFromMiliunits(transactionQuery.data.amount).toString(),
    date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
    payee: transactionQuery.data.payee,
    notes: transactionQuery.data.notes,
  } : undefined;

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

  function handleCreateCategory(name: string) {
    categoryMutation.mutate({ name });
  }

  function handleCreateAccount(name: string) {
    accountMutation.mutate({ name });
  }

  return (
    <>
      <ConfirmDialog />

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Transaction
            </SheetTitle>

            <SheetDescription>
              Edit an existing transaction.
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <SkeletonFormSheet />
          ) : (
            <TransactionForm
              id={id} onSubmit={handleSubmit} disabled={isPending} categoryOptions={categoryOptions}
              accountOptions={accountOptions} onCreateCategory={handleCreateCategory}
              onCreateAccount={handleCreateAccount} onDelete={handleDelete} defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
