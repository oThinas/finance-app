'use client';

/** Core */
import { useMountedState } from 'react-use';

/** Components */
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';
import { EditCategorySheet } from '@/features/categories/components/edit-category-sheet';
import { NewCategorySheet } from '@/features/categories/components/new-category-sheet';
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction-sheet';

export function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
    </>
  );
}
