'use client';

/** Core */
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useState } from 'react';

/** Components */
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { LoadSpin } from '@/components/ui/load-spin';
import { PageCard } from '@/components/ui/page-card';
import { ImportCard } from '@/features/transactions/components/import-card';
import { UploadButton } from '@/features/transactions/components/upload-button';

/** Hooks */
import { useBulkDeleteTransactions } from '@/hooks/transactions/api/use-bulk-delete-transactions';
import { useGetTransactions } from '@/hooks/transactions/api/use-get-transactions';
import { useNewTransactionSheet } from '@/hooks/transactions/use-new-transaction-sheet';

/** Configs */
import { ResponseType, transactionsColumns } from '@/config/transaction-column';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionsPage() {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

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

  function handleUpload(results: typeof INITIAL_IMPORT_RESULTS) {
    console.log('results: ', results);
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  }

  function handleCancelImports() {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard data={importResults.data} onCancel={handleCancelImports} onSubmit={() => { }} />
      </>
    );
  }

  return (
    <PageCard
      title="Transaction history"
      isLoading={getTransactionsQuery.isLoading}
      loadingContent={(
        <div className="flex h-[500px] w-full items-center justify-center">
          <LoadSpin className="size-8 text-slate-300" />
        </div>
      )}
      header={(
        <>
          <Button size="sm" className="w-full lg:w-auto" onClick={handleNewTransaction}>
            <Plus className="mr-2 size-4" />

            Add new
          </Button>

          <UploadButton onUpload={handleUpload} />
        </>
      )}
    >
      <DataTable
        columns={transactionsColumns} data={transactions} filterKey="payee" disabled={isDisabled}
        onDelete={(rows) => handleDeleteTransactions(rows)}
      />
    </PageCard>
  );
}
