'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarNavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Profile",
    href: "/dashboard/settings/profile",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M12 3v18" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    title: "Payment Methods",
    href: "/dashboard/settings/payment-methods",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    title: "Verification",
    href: "/dashboard/settings/verification",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: "Connected Apps",
    href: "/dashboard/settings/connected-apps",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 17H7A5 5 0 0 1 7 7h2" />
        <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
        <line x1="8" x2="16" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Security Questions",
    href: "/dashboard/settings/security-questions",
    icon: (
      <svg
        className="mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 p-4 bg-[#2A2E39] min-h-screen border-r border-[#1E222D]">
      {sidebarNavItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#00C853] text-white hover:bg-[#00C853]/90"
                : "text-[#E4E4E7] hover:bg-[#1E222D] hover:text-[#00C853]"
            )}
          >
            <div className={cn(
              "mr-2",
              isActive ? "text-white" : "text-[#E4E4E7]"
            )}>
              {item.icon}
            </div>
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
