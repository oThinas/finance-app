'use client';

/** Core */
import { ColumnDef } from '@tanstack/react-table';
import { InferResponseType } from 'hono';

/** Components */
import { Checkbox } from '@/components/ui/checkbox';

/** Libs */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Actions } from '@/features/transactions/components/actions';
import { client } from '@/lib/hono';
import { formatCurrency, parseFloatLocale } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { AccountColumn } from './account-column';
import { CategoryColumn } from './category-column';

export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>['data'][0];

export const transactionsColumns: ColumnDef<ResponseType>[] = [
  {
    id: 'select',
    header({ table }) {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell({ row }) {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header({ column }) {
      return (
        <Button
          variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date

          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell({ row }) {
      const date = row.getValue('date') as Date;

      return (
        <span>
          {format(date, 'dd MMM, yyyy')}
        </span>
      );
    },
  },
  {
    accessorKey: 'category',
    header({ column }) {
      return (
        <Button
          variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category

          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell({ row }) {
      return (
        <CategoryColumn id={row.original.id} category={row.original.category} categoryId={row.original.categoryId} />
      );
    },
  },
  {
    accessorKey: 'payee',
    header({ column }) {
      return (
        <Button
          variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payee

          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'amount',
    header({ column }) {
      return (
        <Button
          variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount

          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell({ row }) {
      const amount = parseFloatLocale((row.getValue('amount') as number).toString());

      return (
        <Badge variant={amount < 0 ? 'destructive' : 'primary'} className="px-3.5 py-2.5 text-sm font-medium">
          {formatCurrency(amount)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'account',
    header({ column }) {
      return (
        <Button
          variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account

          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell({ row }) {
      return (
        <AccountColumn account={row.original.account} accountId={row.original.accountId} />
      );
    },
  },
  {
    id: 'actions',
    cell({ row }) {
      return (
        <Actions id={row.original.id} />
      );
    },
  },
];
