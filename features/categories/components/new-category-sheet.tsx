/** Core */
import { z } from 'zod';

/** Components */
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CategoryForm } from '@/features/categories/components/category-form';

/** Hooks */
import { useCreateCategory } from '@/hooks/categories/api/use-create-category';
import { useNewCategorySheet } from '@/hooks/categories/use-new-category-sheet';

/** Database */
import { insertCategorySchema } from '@/db/schema';

const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategorySheet();
  const mutation = useCreateCategory();

  function handleSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            New Category
          </SheetTitle>

          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>

        <CategoryForm onSubmit={handleSubmit} disabled={mutation.isPending} defaultValues={{ name: '' }} />
      </SheetContent>
    </Sheet>
  );
}
