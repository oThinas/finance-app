/** Core */
import { Loader2 } from 'lucide-react';

/** Libs */
import { cn } from '@/lib/utils';

interface LoadSpinProps {
  className?: string;
}

export function LoadSpin(props: LoadSpinProps) {
  return (
    <Loader2 className={cn(props.className, 'animate-spin')} />
  );
}
