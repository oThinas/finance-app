/** Core */
import { useCallback } from 'react';

/** Hooks */
import { useOpenAccountSheet } from '@/hooks/accounts/use-open-account-sheet';

interface AccountColumnProps {
  account: string;
  accountId: string;
}

export function AccountColumn(props: AccountColumnProps) {
  const { onOpen } = useOpenAccountSheet();

  const handleOnClick = useCallback(() => {
    onOpen(props.accountId);
  }, [onOpen, props.accountId]);

  return (
    <div className="flex cursor-pointer items-center hover:underline" onClick={handleOnClick}>
      {props.account}
    </div>
  );
}
