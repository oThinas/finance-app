/** Core */
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

/** Hooks */
import { useDeleteTransaction } from '@/hooks/transactions/api/use-delete-transaction';
import { useOpenTransactionSheet } from '@/hooks/transactions/use-open-transaction-sheet';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

interface ActionsProps {
  id: string;
}

export function Actions(props: ActionsProps) {
  const { onOpen } = useOpenTransactionSheet();
  const deleteMutation = useDeleteTransaction(props.id);
  const [ConfirmDialog, confirm] = useConfirmDialog({ message: 'You are about to delete this transaction' });

  const isPending = deleteMutation.isPending;

  function handleEdit() {
    onOpen(props.id);
  }

  async function handleDelete() {
    const ok = await confirm();
    if (ok) deleteMutation.mutate();
  }

  return (
    <>
      <ConfirmDialog />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={isPending} onClick={handleEdit}>
            <Edit className="mr-2 size-4" />

            Edit
          </DropdownMenuItem>

          <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
            <Trash className="mr-2 size-4" />

            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
