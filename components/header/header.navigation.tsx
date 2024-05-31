'use client';

/** Core */
import { MenuIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMedia } from 'react-use';

/** Components */
import { Header } from '.';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

/** Configs */
import { ROUTES } from '@/config/navigation-routes';

export function HeaderNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia('(max-width: 1024px)', false);
  const pathname = usePathname();
  const router = useRouter();

  function handleClick(href: string) {
    router.push(href);
    setIsOpen(false);
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            className="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20
            hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
            variant="outline" size="sm"
          >
            <MenuIcon className="size-4" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {ROUTES.map((route) => (
              <Button
                key={route.href} variant={route.href === pathname ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => handleClick(route.href)}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden items-center gap-x-2 overflow-x-auto lg:flex">
      {ROUTES.map((route) => (
        <Header.NavigationButton
          key={route.href} href={route.href} label={route.label} isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
}
