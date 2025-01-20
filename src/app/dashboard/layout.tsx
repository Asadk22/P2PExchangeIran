'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname()
  const isSettingsPage = pathname.startsWith('/dashboard/settings')

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {!isSettingsPage && <DashboardSidebar />}
        <main className={`flex-1 p-6 ${!isSettingsPage ? 'ml-64' : ''}`}>
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
