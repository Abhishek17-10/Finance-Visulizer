// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';
import { MainNav } from '../components/MainNav';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Finance Visualizer',
  description: 'Track and visualize your finances',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1 p-4 md:p-8">
              <div className="mx-auto max-w-7xl">
                {children}
              </div>
            </main>
          </div>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}