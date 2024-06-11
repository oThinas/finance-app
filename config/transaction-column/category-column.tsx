/** Core */
import { TriangleAlert } from 'lucide-react';
import { useCallback } from 'react';

/** Hooks */
import { useOpenCategorySheet } from '@/hooks/categories/use-open-category-sheet';

/** Libs */
import { useOpenTransactionSheet } from '@/hooks/transactions/use-open-transaction-sheet';
import { cn } from '@/lib/utils';

interface CategoryColumnProps {
  id: string;
  category: string | null;
  categoryId: string | null;
}

export function CategoryColumn(props: CategoryColumnProps) {
  const { onOpen: onOpenCategory } = useOpenCategorySheet();
  const { onOpen: onOpenTransaction } = useOpenTransactionSheet();

  const handleOnClick = useCallback(() => {
    if (props.categoryId) onOpenCategory(props.categoryId);
    else onOpenTransaction(props.id);
  }, [onOpenCategory, onOpenTransaction, props.categoryId, props.id]);

  return (
    <div
      className={cn('flex cursor-pointer items-center hover:underline', !props.category && 'text-rose-500')}
      onClick={handleOnClick}
    >
      {!props.category && (
        <TriangleAlert className="mr-2 size-4 shrink-0" />
      )}

      {props.category || 'Uncategorized'}
    </div>
  );
}
