/** Core */
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

/** Providers */
import { QueryProvider } from '@/providers/query';
import { SheetProvider } from '@/providers/sheet';

/** Components */
import { Toaster } from '@/components/ui/sonner';

/** Styles */
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Your personal finance manager.',
};

export default function RootLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <SheetProvider />

            <Toaster invert toastOptions={{
              cancelButtonStyle: {
                backgroundColor: '#1e293b',
                paddingRight: '0.5rem',
                paddingLeft: '0.5rem',
                paddingTop: '0.25rem',
                paddingBottom: '0.25rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                lineHeight: '1rem',
              },
            }} />

            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
