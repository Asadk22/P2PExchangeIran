"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { InfoIcon, CheckCircle, Zap, UserCheck } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function TraderBadgesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Trader Program Badges</h2>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Account Level: 1</div>
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
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

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Trader Program Badges</h3>
          <p className="text-muted-foreground">
            Your performance is measured and updated daily across a 90-day period. Meet the requirements to receive your badge and maintain your status.
          </p>
          <p className="text-sm">
            Check out the Paxful Trader Program page to find out more about exclusive benefits.
          </p>
        </div>

        <Progress value={33} className="h-2 w-full" />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Power Trader Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <h4 className="text-lg font-semibold">Power Trader</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span>ID Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span>Address Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>90-day-old account</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span className="flex items-center gap-2">
                  Good behaviour score
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    Trade Partners
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <span>0 / 125</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    Successful Trades
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <span>0 / 250</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>
            </div>
          </div>

          {/* Expert Trader Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              <h4 className="text-lg font-semibold">Expert Trader</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span>ID Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span>Address Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>90-day-old account</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <span>Good behaviour score</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Trade Partners</span>
                  <span>0 / 125</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Successful Trades</span>
                  <span>0 / 1000</span>
                </div>
                <Progress value={0} className="h-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
