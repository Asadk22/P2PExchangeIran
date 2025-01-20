'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { 
  User, 
  CreditCard, 
  Settings, 
  History, 
  Users, 
  UserPlus, 
  Wallet, 
  Users2, 
  LogOut 
} from "lucide-react"

export function UserNav() {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
            <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] bg-[#404040] p-0 border-0" align="end" forceMount>
        <div className="px-4 py-3">
          <div className="text-[15px] text-white font-normal">{session?.user?.email}</div>
          <div className="text-sm text-gray-100">0.00 EUR</div>
        </div>
        <DropdownMenuSeparator className="border-gray-500 m-0" />
        <DropdownMenuGroup className="py-1">
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/settings/profile">
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5" />
                <span>My Profile</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/settings/payment">
              <div className="flex items-center">
                <CreditCard className="mr-3 h-5 w-5" />
                <span>Payment Methods</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/settings">
              <div className="flex items-center">
                <Settings className="mr-3 h-5 w-5" />
                <span>Settings</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/settings/history">
              <div className="flex items-center">
                <History className="mr-3 h-5 w-5" />
                <span>Trade History</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/trade-partners">
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5" />
                <span>Trade Partners</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/invite">
              <div className="flex items-center">
                <UserPlus className="mr-3 h-5 w-5" />
                <span>Invite a Friend</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/settings/history">
              <div className="flex items-center">
                <Wallet className="mr-3 h-5 w-5" />
                <span>My Transactions</span>
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] focus:bg-[#4a4a4a] cursor-pointer">
            <Link href="/dashboard/settings/community">
              <div className="flex items-center">
                <Users2 className="mr-3 h-5 w-5" />
                <span>Join Paxful Community</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="border-gray-500 m-0" />
        <div className="p-4 space-y-2">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 h-9 bg-transparent border-gray-400 text-white hover:bg-[#4a4a4a] hover:text-white text-[13px]"
              onClick={() => window.location.href = '/api/trades/export'}
            >
              Export Trades
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 h-9 bg-transparent border-gray-400 text-white hover:bg-[#4a4a4a] hover:text-white text-[13px]"
              onClick={() => {
                navigator.clipboard.writeText(session?.user?.email || '');
              }}
            >
              Copy Details
            </Button>
          </div>
          <Button 
            variant="ghost" 
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[15px] text-white hover:bg-[#4a4a4a] justify-start font-normal"
            onClick={() => signOut()}
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
