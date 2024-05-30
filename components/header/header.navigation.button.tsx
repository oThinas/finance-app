/** Core */
import Link from 'next/link';

/** Components */
import { Button } from '../ui/button';

/** Libs */
import { cn } from '@/lib/utils';

interface HeaderNavigationButtonProps {
  href: string;
  label: string;
  isActive: boolean;
}

export function HeaderNavigationButton(props: HeaderNavigationButtonProps) {
  return (
    <Button
      asChild size="sm" variant="outline"
      className={cn(
        'w-full justify-between border border-none font-normal text-white outline-none transition',
        'hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent',
        'focus-visible:ring-offset-0 lg:w-auto',
        props.isActive ? 'bg-white/10' : 'bg-transparent',
      )}
    >
      <Link href={props.href}>
        {props.label}
      </Link>
    </Button>
  );
}
