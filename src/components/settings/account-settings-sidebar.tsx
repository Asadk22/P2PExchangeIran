'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  User,
  CreditCard,
  Settings,
  History,
  Users,
  UserPlus,
  FileText,
  Users2,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "My Profile",
    href: "/dashboard/settings/profile",
    icon: User,
  },
  {
    title: "Payment Methods",
    href: "/dashboard/settings/payment",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: Shield,
  },
  {
    title: "Trade History",
    href: "/dashboard/settings/history",
    icon: History,
  },
  {
    title: "Trade Partners",
    href: "/dashboard/settings/partners",
    icon: Users,
  },
  {
    title: "Invite a Friend",
    href: "/dashboard/settings/invite",
    icon: UserPlus,
  },
  {
    title: "My Transactions",
    href: "/dashboard/settings/transactions",
    icon: FileText,
  },
  {
    title: "Join Paxful Community",
    href: "/dashboard/settings/community",
    icon: Users2,
  },
]

export function AccountSettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 space-y-2 bg-[#2A2E39] min-h-screen p-4 border-r border-[#1E222D]">
      {sidebarItems.map((item) => {
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#00C853] text-white hover:bg-[#00C853]/90"
                  : "text-[#E4E4E7] hover:bg-[#1E222D] hover:text-[#00C853]"
              )}
            >
              {Icon && (
                <Icon 
                  className={cn(
                    "h-4 w-4",
                    pathname === item.href
                      ? "text-white"
                      : "text-[#E4E4E7]"
                  )} 
                />
              )}
              {item.title}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
