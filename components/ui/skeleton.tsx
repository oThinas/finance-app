/** Core */
import { HTMLAttributes } from 'react';

/** Libs */
import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
