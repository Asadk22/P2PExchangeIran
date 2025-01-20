'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Info } from "lucide-react"
import { BankVerification } from "@/components/bank-verification"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">General Settings</h2>
          <p className="text-sm text-muted-foreground">Configure your general account preferences</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          {/* Language Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Language & Region</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fa">فارسی</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language for the platform
                </p>
              </div>

              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue="GMT+1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GMT+1">(GMT+1) Europe, Berlin</SelectItem>
                    <SelectItem value="GMT">GMT</SelectItem>
                    <SelectItem value="GMT+3.5">(GMT+3:30) Tehran</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Your local time zone for accurate timing
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Control who can see your profile information
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Let others see when you're online
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Trading History Privacy</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your trading history visible to other users
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Theme Settings</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <Select defaultValue="dark">
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred theme mode
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Advanced Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive desktop notifications for important updates
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-refresh Trading Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically update trading information
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Play sounds for notifications and actions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          {/* Bank Verification */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Bank Account Verification</h3>
            <BankVerification />
          </div>
        </div>
      </Card>
    </div>
  )
}
