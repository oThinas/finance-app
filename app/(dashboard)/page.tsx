'use client';

/** Components */
import { Button } from '@/components/ui/button';

/** Hooks */
import { useNewAccountSheet } from '@/hooks/accounts/use-new-account-sheet';

export default function Home() {
  const { onOpen } = useNewAccountSheet();

  return (
    <div>
      <Button onClick={onOpen}>
        Add an account
      </Button>
    </div>
  );
}
