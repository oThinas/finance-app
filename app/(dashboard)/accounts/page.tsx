'use client';

/** Core */
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { LoadSpin } from '@/components/ui/load-spin';

/** Hooks */
import { useBulkDeleteAccounts } from '@/hooks/accounts/api/use-bulk-delete-accounts';
import { useGetAccounts } from '@/hooks/accounts/api/use-get-accounts';
import { useNewAccountSheet } from '@/hooks/accounts/use-new-account-sheet';

/** Configs */
import { PageCard } from '@/components/ui/page-card';
import { accountColumns } from '@/config/account-columns';

export default function AccountsPage() {
  const newAccount = useNewAccountSheet();

  const deleteAccountsQuery = useBulkDeleteAccounts();
  const getAccountsQuery = useGetAccounts();

  const accounts = getAccountsQuery.data || [];
  const isDisabled = getAccountsQuery.isLoading || deleteAccountsQuery.isPending;

  function handleNewAccount() {
    newAccount.onOpen();
  }

  function handleDeleteAccounts(rows: Row<{ id: string; name: string }>[]) {
    const ids = rows.map((row) => row.original.id);
    deleteAccountsQuery.mutate({ ids });
  }

  return (
    <PageCard
      title="Accounts"
      isLoading={getAccountsQuery.isLoading}
      loadingContent={(
        <div className="flex h-[500px] w-full items-center justify-center">
          <LoadSpin className="size-8 text-slate-300" />
        </div>
      )}
      header={(
        <Button size="sm" onClick={handleNewAccount}>
          <Plus className="mr-2 size-4" />

          Add new
        </Button>
      )}
    >
      <DataTable
        columns={accountColumns} data={accounts} filterKey="name" disabled={isDisabled}
        onDelete={(rows) => handleDeleteAccounts(rows)}
      />
    </PageCard>
  );
}
