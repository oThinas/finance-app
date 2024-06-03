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
import { useBulkDeleteCategories } from '@/hooks/categories/api/use-bulk-delete-categories';
import { useGetCategories } from '@/hooks/categories/api/use-get-categories';
import { useNewCategorySheet } from '@/hooks/categories/use-new-category-sheet';

/** Configs */
import { categoryColumns } from '@/config/category-columns';

export default function CategoriesPage() {
  const newCategory = useNewCategorySheet();

  const deleteCategoriesQuery = useBulkDeleteCategories();
  const getCategoriesQuery = useGetCategories();

  const categories = getCategoriesQuery.data || [];
  const isDisabled = getCategoriesQuery.isLoading || deleteCategoriesQuery.isPending;

  function handleNewCategory() {
    newCategory.onOpen();
  }

  function handleDeleteCategories(rows: Row<{ id: string; name: string }>[]) {
    const ids = rows.map((row) => row.original.id);
    deleteCategoriesQuery.mutate({ ids });
  }

  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          {getCategoriesQuery.isLoading ? (
            <>
              <Skeleton className="h-8 w-48" />

              <Skeleton className="h-8 w-24" />
            </>
          ) : (
            <>
              <CardTitle className="line-clamp-1 text-xl">
                Categories
              </CardTitle>

              <Button size="sm" onClick={handleNewCategory}>
                <Plus className="mr-2 size-4" />

                Add new
              </Button>
            </>
          )}
        </CardHeader>

        <CardContent>
          {getCategoriesQuery.isLoading ? (
            <div className="flex h-[500px] w-full items-center justify-center">
              <LoadSpin className="size-8 text-slate-300" />
            </div>
          ) : (
            <DataTable
              columns={categoryColumns} data={categories} filterKey="name" disabled={isDisabled}
              onDelete={(rows) => handleDeleteCategories(rows)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
