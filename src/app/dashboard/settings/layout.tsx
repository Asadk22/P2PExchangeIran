'use client'

import { AccountSettingsSidebar } from "@/components/settings/account-settings-sidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-6">
      <AccountSettingsSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
