'use client';

/** Core */
import { ColumnDef } from '@tanstack/react-table';
import { InferResponseType } from 'hono';
import { ArrowUpDown } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Actions } from '@/features/categories/components/actions';

/** Libs */
import { client } from '@/lib/hono';

export type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>['data'][0];

export const categoryColumns: ColumnDef<ResponseType>[] = [
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
    accessorKey: 'name',
    header({ column }) {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
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
