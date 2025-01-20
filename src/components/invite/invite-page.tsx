"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { InfoIcon, Copy, ChevronDown, Facebook, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"

export default function InvitePage() {
  const referralLink = "https://paxful.com/register?r=E1da4R5"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Invite a Friend</h2>
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

      <Tabs defaultValue="referrals" className="w-full">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-auto">
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
        </TabsList>

        <TabsContent value="referrals" className="space-y-6">
          <div className="pt-4">
            <h3 className="text-2xl font-bold">
              Invite friends to join <span className="text-[#D1F366]">Paxful</span>.
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4">Referral link</h4>
              <div className="space-y-4">
                <p className="text-sm">Your referral link</p>
                <div className="flex gap-2">
                  <Input 
                    value={referralLink}
                    readOnly
                    className="bg-muted"
                  />
                  <Button 
                    onClick={handleCopy}
                    className="bg-[#D1F366] text-black hover:bg-[#bfdd5d] whitespace-nowrap"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Anyone who uses this link will become your referral on Paxful
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Share your link on social media</p>
                  <div className="flex gap-4">
                    <Button variant="ghost" size="icon">
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4">Referral QR code</h4>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Image
                    src="/qr-code-example.png"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="border rounded-lg p-2"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Anyone who scans this QR code will become your referral on Paxful
                </p>
                <Button variant="outline" className="w-full justify-between">
                  <span>Embed QR code to your website</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="affiliates">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Affiliate program information will be available soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
