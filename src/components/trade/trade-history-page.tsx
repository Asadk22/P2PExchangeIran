"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import Image from "next/image"
import { Download, Copy, Filter } from "lucide-react"
import Link from "next/link"

export default function TradeHistoryPage() {
  const [timeFilter, setTimeFilter] = useState("day")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trade History</h2>
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

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          You are viewing all trades for the last {timeFilter}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Trades
          </Button>
        </div>

        <div className="bg-background rounded-lg p-4">
          <div className="text-sm mb-4">
            Completed Trades: 0% (trades out of 0)
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Past Trades</h3>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Trades
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Copy Details
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Image
                src="/empty-wallet.svg"
                alt="No trades"
                width={100}
                height={100}
                className="mb-4"
              />
              <p className="text-muted-foreground mb-4">You haven&apos;t traded yet.</p>
              <Link href="/dashboard">
                <Button>Start trading now!</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
