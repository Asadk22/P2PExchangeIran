'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  History,
  Users,
  FileText,
  Star,
  BarChart2,
  Award,
  UserPlus,
  Settings,
  GraduationCap,
  Users2,
  Code,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Create New Trade",
    href: "/dashboard/create-offer",
    variant: "default",
    className: "w-full bg-green-500 hover:bg-green-600 text-white mb-4",
  },
  {
    title: "Trade History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Recent Trade Partners",
    href: "/dashboard/partners",
    icon: Users,
  },
  {
    title: "My Offers",
    href: "/dashboard/offers",
    icon: FileText,
  },
  {
    title: "Favorite Offers",
    href: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Trade Statistics",
    href: "/dashboard/statistics",
    icon: BarChart2,
  },
  {
    title: "Trader Program Badges",
    href: "/dashboard/badges",
    icon: Award,
  },
  {
    title: "Invite a Friend",
    href: "/dashboard/invite",
    icon: UserPlus,
  },
  {
    title: "Account Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "P2P University",
    href: "/dashboard/university",
    icon: GraduationCap,
  },
  {
    title: "P2P Community",
    href: "/dashboard/community",
    icon: Users2,
  },
  {
    title: "Developer",
    href: "/dashboard/developer",
    icon: Code,
  },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 space-y-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={item.variant || "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                pathname === item.href && !item.variant && "bg-muted",
                item.className
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.title}
            </Button>
          </Link>
        )
      })}
      <div className="mt-auto pt-4">
        <Button variant="outline" className="w-full justify-start gap-2">
          <MessageSquare className="h-4 w-4" />
          Do you have an idea for us?
        </Button>
      </div>
    </div>
  )
}
