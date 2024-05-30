/** Core */
import { ReactNode } from 'react';

/** Components */
import { Header } from '@/components/header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Header.Root />

      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>
  );
}
