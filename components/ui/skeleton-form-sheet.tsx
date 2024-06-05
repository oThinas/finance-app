/** Components */
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonFormSheet() {
  return (
    <div className="flex flex-col gap-2 pt-8">
      <Skeleton className="h-7 w-1/3" />
      <Skeleton className="h-7" />
      <Skeleton className="h-7" />
    </div>
  );
}
