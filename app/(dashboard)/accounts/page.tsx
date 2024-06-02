'use client';

/** Core */
import { Plus } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { LoadSpin } from '@/components/ui/load-spin';
import { Skeleton } from '@/components/ui/skeleton';

/** Hooks */
import { useBulkDeleteAccounts } from '@/hooks/accounts/api/use-bulk-delete-accounts';
import { useGetAccounts } from '@/hooks/accounts/api/use-get-accounts';
import { useNewAccountSheet } from '@/hooks/accounts/use-new-account-sheet';

/** Configs */
import { accountColumns } from '@/config/account-columns';
import { Row } from '@tanstack/react-table';

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
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          {getAccountsQuery.isLoading ? (
            <>
              <Skeleton className="h-8 w-48" />

              <Skeleton className="h-8 w-24" />
            </>
          ) : (
            <>
              <CardTitle className="line-clamp-1 text-xl">
                Accounts Page
              </CardTitle>

              <Button size="sm" onClick={handleNewAccount}>
                <Plus className="mr-2 size-4" />

                Add new
              </Button>
            </>
          )}
        </CardHeader>

        <CardContent>
          {getAccountsQuery.isLoading ? (
            <div className="flex h-[500px] w-full items-center justify-center">
              <LoadSpin className="size-8 text-slate-300" />
            </div>
          ) : (
            <DataTable
              columns={accountColumns} data={accounts} filterKey="email" disabled={isDisabled}
              onDelete={(rows) => handleDeleteAccounts(rows)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
