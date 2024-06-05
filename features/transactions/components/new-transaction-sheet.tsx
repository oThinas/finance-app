/** Core */
import { z } from 'zod';

/** Components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { TransactionForm } from '@/features/transactions/components/transaction-form';

/** Hooks */
import { useCreateAccount } from '@/hooks/accounts/api/use-create-account';
import { useGetAccounts } from '@/hooks/accounts/api/use-get-accounts';
import { useCreateCategory } from '@/hooks/categories/api/use-create-category';
import { useGetCategories } from '@/hooks/categories/api/use-get-categories';
import { useCreateTransaction } from '@/hooks/transactions/api/use-create-transaction';
import { useNewTransactionSheet } from '@/hooks/transactions/use-new-transaction-sheet';

/** Database */
import { SkeletonFormSheet } from '@/components/ui/skeleton-form-sheet';
import { insertTransactionsSchema } from '@/db/schema';

const formSchema = insertTransactionsSchema.omit({ id: true });
type FormValues = z.input<typeof formSchema>;

export function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransactionSheet();

  const transactionMutation = useCreateTransaction();
  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const isPending = transactionMutation.isPending || categoryMutation.isPending || accountMutation.isPending;
  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const categoryOptions = (categoryQuery.data || []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = (accountQuery.data || []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  function handleCreateCategory(name: string) {
    categoryMutation.mutate({ name });
  }

  function handleCreateAccount(name: string) {
    accountMutation.mutate({ name });
  }

  function handleSubmit(values: FormValues) {
    transactionMutation.mutate(values, {
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
            New Transaction
          </SheetTitle>

          <SheetDescription>
            Create a new transaction to track your expenses.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <SkeletonFormSheet />
        ) : (
          <TransactionForm
            onSubmit={handleSubmit} disabled={isPending} categoryOptions={categoryOptions}
            accountOptions={accountOptions} onCreateCategory={handleCreateCategory}
            onCreateAccount={handleCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
