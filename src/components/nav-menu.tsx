'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationBell } from '@/components/notifications/NotificationBell';

export default function NavMenu() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <div className="flex items-center gap-4">
      {session?.user ? (
        <>
          <NotificationBell />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={`https://avatar.vercel.sh/${session.user.email}`} 
                    alt={session.user.email || ''} 
                  />
                  <AvatarFallback>
                    {session.user.email?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
