'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ArrowLeftRight,
  MessageSquare,
  Bell,
  UserCircle,
  Settings,
  Wallet,
  ShieldAlert,
  History,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotificationCounts } from '@/hooks/useNotificationCounts';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

export function SidebarNav() {
  const pathname = usePathname();
  const { activeTrades, unreadMessages, notifications } = useNotificationCounts();

  const mainNavItems: NavItem[] = [
    {
      title: 'Overview',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: 'Active Trades',
      href: '/dashboard/trades',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      badge: activeTrades,
    },
    {
      title: 'Messages',
      href: '/dashboard/messages',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: unreadMessages,
    },
    {
      title: 'Notifications',
      href: '/dashboard/notifications',
      icon: <Bell className="w-5 h-5" />,
      badge: notifications,
    },
  ];

  const secondaryNavItems: NavItem[] = [
    {
      title: 'Wallet',
      href: '/dashboard/wallet',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      title: 'Trade History',
      href: '/dashboard/history',
      icon: <History className="w-5 h-5" />,
    },
    {
      title: 'Disputes',
      href: '/dashboard/disputes',
      icon: <ShieldAlert className="w-5 h-5" />,
    },
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: <UserCircle className="w-5 h-5" />,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/new-trade">
            <Button className="w-full">
              Create New Trade
            </Button>
          </Link>
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href ? 'bg-accent' : 'transparent'
                )}
              >
                {item.icon}
                <span className="ml-3 flex-1">{item.title}</span>
                {item.badge ? (
                  <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                ) : null}
              </span>
            </Link>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          {secondaryNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href ? 'bg-accent' : 'transparent'
                )}
              >
                {item.icon}
                <span className="ml-3 flex-1">{item.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
