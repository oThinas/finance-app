'use client';

/** Core */
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/** Hooks */
import { useDeleteAccount } from '@/hooks/accounts/api/use-delete-accounts';
import { useOpenAccountSheet } from '@/hooks/accounts/use-open-account-sheet';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

interface ActionProps {
  id: string;
}

export function Actions(props: ActionProps) {
  const { onOpen } = useOpenAccountSheet();
  const deleteMutation = useDeleteAccount(props.id);
  const [ConfirmDialog, confirm] = useConfirmDialog({ message: 'You are about to delete this account' });

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
