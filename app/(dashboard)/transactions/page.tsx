'use client';

/** Core */
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { LoadSpin } from '@/components/ui/load-spin';
import { Skeleton } from '@/components/ui/skeleton';

/** Hooks */
import { useBulkDeleteTransactions } from '@/hooks/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/hooks/transactions/api/use-get-transactions';
import { useNewTransactionSheet } from '@/hooks/transactions/use-new-transaction-sheet';

/** Configs */
import { ResponseType, transactionsColumns } from '@/config/transaction-column';

export default function TransactionsPage() {
  const newTransaction = useNewTransactionSheet();

  const deleteTransactionsQuery = useBulkDeleteTransactions();
  const getTransactionsQuery = useGetTransactions();

  const transactions = getTransactionsQuery.data || [];
  const isDisabled = getTransactionsQuery.isLoading || deleteTransactionsQuery.isPending;

  function handleNewTransaction() {
    newTransaction.onOpen();
  }

  function handleDeleteTransactions(rows: Row<ResponseType>[]) {
    const ids = rows.map((row) => row.original.id);
    deleteTransactionsQuery.mutate({ ids });
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          {getTransactionsQuery.isLoading ? (
            <>
              <Skeleton className="h-8 w-48" />

              <Skeleton className="h-8 w-24" />
            </>
          ) : (
            <>
              <CardTitle className="line-clamp-1 text-xl">
                Transaction history
              </CardTitle>

              <Button size="sm" onClick={handleNewTransaction}>
                <Plus className="mr-2 size-4" />

                Add new
              </Button>
            </>
          )}
        </CardHeader>

        <CardContent>
          {getTransactionsQuery.isLoading ? (
            <div className="flex h-[500px] w-full items-center justify-center">
              <LoadSpin className="size-8 text-slate-300" />
            </div>
          ) : (
            <DataTable
              columns={transactionsColumns} data={transactions} filterKey="payee" disabled={isDisabled}
              onDelete={(rows) => handleDeleteTransactions(rows)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
