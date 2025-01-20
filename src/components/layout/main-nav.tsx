'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/dashboard/user-nav"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NotificationBell } from "@/components/notifications/NotificationBell"

const publicNavItems = [
  {
    title: "Trades",
    href: "/trades",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
  },
  {
    title: "About",
    href: "/about",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#1C1F26]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1C1F26]/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              P2P <span className="text-[#4CAF50]">Exchange</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {publicNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-[#4CAF50]/10 hover:text-[#4CAF50]",
                  pathname === item.href 
                    ? "bg-[#4CAF50]/10 text-[#4CAF50]" 
                    : "text-gray-400"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 items-center justify-center px-6 max-w-2xl">
          <div className="w-full relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search trades..."
              className="w-full pl-9 bg-[#1C1F26]/50 border-gray-800 text-white placeholder:text-gray-400 focus:border-[#4CAF50]/40 focus:ring-[#4CAF50]/40"
            />
          </div>
        </div>

        {/* Right section - Actions and User Nav */}
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            size="sm"
            className="hidden md:flex bg-[#4CAF50] text-white hover:bg-[#45a049]"
            asChild
          >
            <Link href="/trades/create">Create Trade</Link>
          </Button>
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </div>
  )
}
