'use client';

/** Core */
import { Plus } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';

/** Hooks */
import { useNewAccountSheet } from '@/hooks/accounts/use-new-account-sheet';

/** Configs */
import { Payment, columns } from './columns';

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'a@example.com',
  },
];

export default function AccountsPage() {
  const newAccount = useNewAccountSheet();

  function handleNewAccount() {
    newAccount.onOpen();
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="line-clamp-1 text-xl">
            Accounts Page
          </CardTitle>

          <Button size="sm" onClick={handleNewAccount}>
            <Plus className="mr-2 size-4" />

            Add new
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={data} filterKey="email" onDelete={() => { }} disabled={false} />
        </CardContent>
      </Card>
    </div>
  );
}
