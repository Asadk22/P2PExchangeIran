'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Info } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Profile Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your profile information and preferences</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-2xl">U</span>
              </div>
              <div>
                <Button variant="outline" size="sm">Upload Image</Button>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a nice picture, preferably of yourself. If you upload an inappropriate image, we will remove it immediately.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="flex gap-2">
                  <Select defaultValue="+98">
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+98">+98</SelectItem>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Add your phone number with country code" className="flex-1" />
                  <Button>Confirm</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Must be a mobile phone
                </p>
              </div>

              <Alert variant="destructive" className="bg-red-50 text-red-600 border-red-200">
                <AlertDescription className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  It is mandatory to set answers to your security questions in case you have to reset or change the phone number.
                  <Button variant="link" className="text-red-600 h-auto p-0">Set answers</Button>
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Preferred currency</Label>
                <Select defaultValue="EUR">
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Select which currency your wallet will use
                </p>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea 
                  placeholder="Your bio appears on your public profile"
                  className="resize-none"
                  maxLength={180}
                />
                <p className="text-sm text-muted-foreground">
                  Maximum 3 lines and 180 characters
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4 items-center border-b pb-2">
                <div className="col-span-1 font-medium">Notification Type</div>
                <div className="text-sm font-medium text-center">Web</div>
                <div className="text-sm font-medium text-center">Email</div>
                <div className="text-sm font-medium text-center">Telegram</div>
                <div className="text-sm font-medium text-center">App</div>
              </div>
              {[
                { name: "Bitcoin price change", icon: Info },
                { name: "Buyer started completing order" },
                { name: "Cryptocurrency deposit confirmed" },
                { name: "Cryptocurrency deposit pending" },
                { name: "Cryptocurrency purchased" },
                { name: "Cryptocurrency sent" },
                { name: "Cryptocurrency sold" },
                { name: "Funds reserved for trade" },
                { name: "Incoming trade" },
                { name: "New chat message" },
                { name: "New moderator message" },
                { name: "Partner paid for trade" },
                { name: "Someone viewed my profile" },
                { name: "Tether price change" },
                { name: "Trade canceled/expired" },
              ].map((item) => (
                <div key={item.name} className="grid grid-cols-5 gap-4 items-center py-2">
                  <div className="text-sm flex items-center gap-2">
                    {item.name}
                    {item.icon && <item.icon className="h-4 w-4" />}
                  </div>
                  <div className="flex justify-center">
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-center">
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-center">
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-center">
                    <Switch defaultChecked />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-2">
                <Switch id="key-notifications" defaultChecked />
                <Label htmlFor="key-notifications">Key notifications sound for new messages and trades</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="receive-emails" defaultChecked />
                <Label htmlFor="receive-emails">Receive important emails from us automatically</Label>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label>Your Time Zone</Label>
              <Select defaultValue="GMT+1">
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GMT+1">(GMT+1) Europe, Berlin - 15:56 AM</SelectItem>
                  <SelectItem value="GMT">GMT</SelectItem>
                  <SelectItem value="GMT-5">(GMT-5) Eastern Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
