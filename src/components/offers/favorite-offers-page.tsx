"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { InfoIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function FavoriteOffersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Favorite Offers</h2>
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

      <Tabs defaultValue="sell" className="w-full">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-auto">
          <TabsTrigger 
            value="sell" 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            Sell cryptocurrency
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">0</span>
          </TabsTrigger>
          <TabsTrigger 
            value="buy"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            Buy cryptocurrency
            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">0</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sell" className="mt-6">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <Image
              src="/empty-wallet.svg"
              alt="No offers"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-muted-foreground">No offers found</p>
          </div>
        </TabsContent>

        <TabsContent value="buy" className="mt-6">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <Image
              src="/empty-wallet.svg"
              alt="No offers"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-muted-foreground">No offers found</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
