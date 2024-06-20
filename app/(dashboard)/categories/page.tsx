'use client';

/** Core */
import { Row } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

/** Components */
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { LoadSpin } from '@/components/ui/load-spin';
import { PageCard } from '@/components/ui/page-card';

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
    <PageCard
      title="Categories"
      isLoading={getCategoriesQuery.isLoading}
      loadingContent={(
        <div className="flex h-[500px] w-full items-center justify-center">
          <LoadSpin className="size-8 text-slate-300" />
        </div>
      )}
      header={(
        <Button size="sm" onClick={handleNewCategory}>
          <Plus className="mr-2 size-4" />

          Add new
        </Button>
      )}
    >
      <DataTable
        columns={categoryColumns} data={categories} filterKey="name" disabled={isDisabled}
        onDelete={(rows) => handleDeleteCategories(rows)}
      />
    </PageCard>
  );
}
