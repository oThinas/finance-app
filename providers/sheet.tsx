'use client';

/** Core */
import { useMountedState } from 'react-use';

/** Components */
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';

export function SheetProvider() {
  const isMounted = useMountedState();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
    </>
  );
}
