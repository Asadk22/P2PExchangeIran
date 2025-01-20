"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function TradePartnersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recent Trade Partners</h2>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Account Level: 1</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Account Limit: 973.3
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-red-500">Phone Number Not Verified</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Take a minute to verify your number
            </div>
            <Link href="/dashboard/settings/profile">
              <Button variant="link" className="text-green-600 p-0">
                Verify Me
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-red-500">2FA Not Enabled</div>
            </div>
            <div className="text-sm text-muted-foreground">
              Enabling two-factor authentication is great way to secure your account.
            </div>
            <Link href="/dashboard/settings/security">
              <Button variant="link" className="text-green-600 p-0">
                Setup 2FA Now
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="bg-background rounded-lg p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/empty-wallet.svg"
            alt="No trade partners"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-muted-foreground mb-2">No recent trades found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Start trading to see your trade partners here
          </p>
          <Link href="/dashboard">
            <Button>Start Trading Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
