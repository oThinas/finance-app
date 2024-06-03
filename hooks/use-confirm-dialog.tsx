/** Core */
import { useState } from 'react';

/** Components */
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ConfirmDialogProps {
  message: string;
  title?: string;
}

export function useConfirmDialog({
  title = 'Are you sure?',
  ...props
}: ConfirmDialogProps): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{ resolve(value: boolean): void } | null>(null);

  function handleOpen() {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  }

  function handleClose() {
    setPromise(null);
  }

  function handleConfirm() {
    promise?.resolve(true);
    handleClose();
  }

  function handleCancel() {
    promise?.resolve(false);
    handleClose();
  }

  function onOpenChange() {
    if (promise === null) handleOpen();
    else handleCancel();
  }

  function ConfirmationDialog() {
    return (
      <Dialog open={promise !== null} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>

            <DialogDescription>
              {props.message}
            </DialogDescription>
          </DialogHeader>

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
