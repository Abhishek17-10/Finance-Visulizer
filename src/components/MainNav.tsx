'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LineChart, Wallet, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ModeToggle } from './ModeToggle';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: Wallet,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: LineChart,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}