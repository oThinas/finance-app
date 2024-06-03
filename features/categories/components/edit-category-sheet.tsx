/** Core */
import { z } from 'zod';

/** Components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryForm } from '@/features/categories/components/category-form';

/** Hooks */
import { useDeleteCategory } from '@/hooks/categories/api/use-delete-category';
import { useEditCategory } from '@/hooks/categories/api/use-edit-category';
import { useGetCategory } from '@/hooks/categories/api/use-get-category';
import { useOpenCategorySheet } from '@/hooks/categories/use-open-category-sheet';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';

/** Database */
import { insertCategorySchema } from '@/db/schema';

const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategorySheet();
  const [ConfirmDialog, confirm] = useConfirmDialog({ message: 'You are about to delete this category' });

  const categoryQuery = useGetCategory(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const defaultValues = categoryQuery.data ? { name: categoryQuery.data.name } : { name: '' };

  function handleSubmit(values: FormValues) {
    editMutation.mutate(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  async function handleDelete() {
    const ok = await confirm();
    if (ok) deleteMutation.mutate(undefined, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <>
      <ConfirmDialog />

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Category
            </SheetTitle>

            <SheetDescription>
              Edit an existing category.
            </SheetDescription>
          </SheetHeader>

          {isLoading ? (
            <div className="flex flex-col gap-2 pt-8">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-7" />
              <Skeleton className="h-7" />
            </div>
          ) : (
            <CategoryForm
              id={id} disabled={isPending} defaultValues={defaultValues}
              onSubmit={handleSubmit} onDelete={handleDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
