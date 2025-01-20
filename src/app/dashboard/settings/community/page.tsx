"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        {/* Header with Illustration */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">Community Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Manage your profile, privacy settings, and notification preferences to enhance your trading experience.
            </p>
            <Button variant="outline">View Public Profile</Button>
          </div>
          <div className="relative h-[600px] hidden md:block">
            <Image
              src="/images/community-artistic-enhanced.svg"
              alt="Community illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                    placeholder="Your display name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                    rows={3}
                    placeholder="Tell others about yourself"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-800"
                    placeholder="Your location"
                  />
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Verification Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <div>
                    <p className="font-medium">Identity Verified</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your identity has been verified</p>
                  </div>
                  <span className="text-green-600 dark:text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <div>
                    <p className="font-medium">Phone Verified</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your phone number has been verified</p>
                  </div>
                  <span className="text-green-600 dark:text-green-400">✓</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your profile</p>
                  </div>
                  <select className="p-2 border rounded-md dark:bg-gray-800">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Verified Users Only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Trading History</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Control who can see your trading history</p>
                  </div>
                  <select className="p-2 border rounded-md dark:bg-gray-800">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Trading Partners Only</option>
                  </select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Trade Updates</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about your trades</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about security events</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Market Updates</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates about market changes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
