/** Core */
import { useRef, useState } from 'react';

/** Components */
import { Button } from '@/components/ui/button';
import { CreatableSelect } from '@/components/ui/creatable-select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

/** Hooks */
import { useCreateAccount } from '@/hooks/accounts/api/use-create-account';
import { useGetAccounts } from '@/hooks/accounts/api/use-get-accounts';

export function useSelectAccount(): [() => JSX.Element, () => Promise<unknown>] {
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isLoading = accountQuery.isLoading || accountMutation.isPending;

  const [promise, setPromise] = useState<{ resolve(value: string | undefined): void } | null>(null);
  const selectedValue = useRef<string>();

  function handleOpen() {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(selectedValue.current);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(undefined);
    handleClose();
  }

  function onOpenChange() {
    if (promise === null) handleOpen();
    else handleCancel();
  }

  function handleCreateAccount(name: string) {
    accountMutation.mutate({ name });
  }

  function handleSelectAccount(value: string) {
    selectedValue.current = value;
  }

  function ConfirmationDialog() {
    return (
      <Dialog open={promise !== null} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Select account
            </DialogTitle>

            <DialogDescription>
              Please select an account to continue
            </DialogDescription>
          </DialogHeader>

          <CreatableSelect
            placeholder="Select an account" options={accountOptions} disabled={isLoading}
            onCreate={handleCreateAccount} onChange={(value) => handleSelectAccount(value as string)}
          />

          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>

            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return [ConfirmationDialog, handleOpen];
}
