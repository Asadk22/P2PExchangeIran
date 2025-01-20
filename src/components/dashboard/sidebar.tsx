'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Clock,
  History,
  MessageSquare,
  Plus,
  Settings,
  Star,
  User,
  Users,
  AlertTriangle,
  BarChart,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarNavItems = [
  {
    title: "Trade History",
    href: "/dashboard/trade-history",
    icon: History,
  },
  {
    title: "Recent Trade Partners",
    href: "/dashboard/trade-partners",
    icon: Users,
  },
  {
    title: "My Offers",
    href: "/dashboard/my-offers",
    icon: Clock,
  },
  {
    title: "Favorite Offers",
    href: "/dashboard/favorite-offers",
    icon: Star,
  },
  {
    title: "Trade Statistics",
    href: "/dashboard/statistics",
    icon: BarChart,
  },
  {
    title: "Trader Program Badges",
    href: "/dashboard/badges",
    icon: User,
  },
  {
    title: "Invite a Friend",
    href: "/dashboard/invite",
    icon: Plus,
  },
  {
    title: "Account Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Verification",
    href: "/dashboard/settings/verification",
    icon: Shield,
  },
  {
    title: "P2P University",
    href: "/dashboard/university",
    icon: MessageSquare,
  },
  {
    title: "P2P Community",
    href: "/dashboard/community",
    icon: Users,
  },
  {
    title: "Developer",
    href: "/dashboard/developer",
    icon: AlertTriangle,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen border-r border-[#1E222D] bg-[#2A2E39]">
      <div className="space-y-4 py-4">
        <div className="px-4">
          <Button className="w-full bg-[#00C853] hover:bg-[#00C853]/90 text-white">
            Create New Trade
          </Button>
        </div>
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === item.href
                    ? "bg-[#00C853] text-white"
                    : "text-[#E4E4E7] hover:bg-[#1E222D] hover:text-[#00C853]"
                )}
              >
                <item.icon className={cn(
                  "mr-2 h-4 w-4",
                  pathname === item.href
                    ? "text-white"
                    : "text-[#E4E4E7]"
                )} />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full bg-white text-[#1C1F26] border-[#1E222D] hover:bg-gray-100 hover:text-[#1C1F26]">
          Do you have an idea for us?
        </Button>
      </div>
    </nav>
  )
}
