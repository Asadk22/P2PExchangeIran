'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Security Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your account security and active sessions</p>
        </div>
      </div>

      <Card className="p-6 space-y-8">
        {/* 2FA Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Two-factor authentication (2FA) settings</h3>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <p>Set up your 2FA and make your account more secure.</p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Google Authenticator or Authy</div>
                <div className="text-sm text-muted-foreground">Scan QR code or enter code provided by the app</div>
              </div>
              <Button variant="outline">Activate now</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">A code will be sent to your email when needed</div>
              </div>
              <Button variant="outline">Activate now</Button>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Change password</h3>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <p>If you forgot your current password, log out first, then recover with <Button variant="link" className="h-auto p-0">forgot password</Button></p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current password</Label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label>New password</Label>
              <Input type="password" placeholder="Enter a new password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm password</Label>
              <Input type="password" placeholder="Confirm the password" />
            </div>
            <Button>Change password</Button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active sessions</h3>
            <Button variant="outline" size="sm">End all sessions except current one</Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
              <div>BROWSER</div>
              <div>DEVICE</div>
              <div>IP ADDRESS</div>
              <div>LOCATION</div>
              <div>ACTION</div>
            </div>
            {[
              {
                browser: 'Chrome 120.0.6099.71',
                device: 'Mac OS X',
                ip: '127.0.0.1',
                location: 'Germany, Berlin',
                current: true
              },
              {
                browser: 'Safari iOS 16.2',
                device: 'iPhone',
                ip: '127.0.0.1',
                location: 'Frankfurt am Main',
                current: false
              }
            ].map((session, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 text-sm py-2">
                <div>{session.browser}</div>
                <div>{session.device}</div>
                <div>{session.ip}</div>
                <div>{session.location}</div>
                <div>
                  {session.current ? 
                    <Badge>Current session</Badge> :
                    <Button variant="ghost" size="sm" className="h-8">End session</Button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Activity */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Account activity</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
              <div>ACTION</div>
              <div>BROWSER</div>
              <div>IP ADDRESS</div>
              <div>LOCATION</div>
              <div>STATUS</div>
              <div>DATE/TIME</div>
            </div>
            {[
              {
                action: 'User login',
                browser: 'Chrome 120.0.6099.71',
                ip: '127.0.0.1',
                location: 'Berlin, Germany',
                status: 'Success',
                datetime: '2024-12-29 19:15'
              },
              {
                action: 'Change password',
                browser: 'Chrome 120.0.6099.71',
                ip: '127.0.0.1',
                location: 'Berlin, Germany',
                status: 'Success',
                datetime: '2024-12-29 18:30'
              },
              {
                action: 'Enable 2FA',
                browser: 'Chrome 120.0.6099.71',
                ip: '127.0.0.1',
                location: 'Berlin, Germany',
                status: 'Success',
                datetime: '2024-12-29 18:00'
              }
            ].map((activity, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 text-sm py-2">
                <div>{activity.action}</div>
                <div>{activity.browser}</div>
                <div>{activity.ip}</div>
                <div>{activity.location}</div>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {activity.status}
                  </Badge>
                </div>
                <div>{activity.datetime}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Account */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Closing account</h3>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <p>Closing your account will delete all your information on our PayPal such as your trade history. Once you close your account, you'll receive a confirmation link that we will send to your email address.</p>
          </div>
          <Button variant="destructive">Close account</Button>
        </div>
      </Card>
    </div>
  )
}
