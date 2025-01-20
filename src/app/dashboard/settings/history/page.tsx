"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function TradeHistory() {
  const [selectedTab, setSelectedTab] = useState("trade-history")

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#111]">
      <div className="container mx-auto px-4 py-8">
        {/* Account Status Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Account Level */}
          <Card className="p-6 bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Account Level: 1</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Limit: €970.8</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-5 h-5 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your current account level and trading limits</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Card>

          {/* Phone Verification */}
          <Card className="p-6 bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-2">Phone Number Not Verified</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Take a minute to verify your number</p>
                <Button variant="outline" size="sm" className="text-[#4CAF50] border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white">
                  Verify Me
                </Button>
              </div>
              <Image
                src="/icons/phone-verify.svg"
                alt="Phone verification"
                width={24}
                height={24}
                className="opacity-60"
              />
            </div>
          </Card>

          {/* 2FA Status */}
          <Card className="p-6 bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-500 mb-2">2FA Not Enabled</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Enable two-factor authentication for better security</p>
                <Button variant="outline" size="sm" className="text-[#4CAF50] border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white">
                  Setup 2FA Now
                </Button>
              </div>
              <Image
                src="/icons/2fa.svg"
                alt="2FA security"
                width={24}
                height={24}
                className="opacity-60"
              />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button
              onClick={() => setSelectedTab("trade-history")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                selectedTab === "trade-history"
                  ? "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9h18M3 15h18M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Trade History
            </button>

            <button
              onClick={() => setSelectedTab("recent-partners")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                selectedTab === "recent-partners"
                  ? "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Recent Trade Partners
            </button>

            <button
              onClick={() => setSelectedTab("my-offers")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                selectedTab === "my-offers"
                  ? "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              My Offers
            </button>

            <button
              onClick={() => setSelectedTab("favorite-offers")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                selectedTab === "favorite-offers"
                  ? "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Favorite Offers
            </button>

            <button
              onClick={() => setSelectedTab("trade-statistics")}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                selectedTab === "trade-statistics"
                  ? "bg-[#4CAF50] bg-opacity-10 text-[#4CAF50]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Trade Statistics
            </button>

            <div className="pt-4">
              <Link
                href="/dashboard/settings"
                className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Account Settings
              </Link>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <Card className="p-6 bg-white dark:bg-[#1A1A1A] border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Trade History</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Trades
                  </Button>
                  <Button variant="outline" size="sm">
                    Filters
                  </Button>
                </div>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                You are viewing all trades for the last 2 days
              </div>

              {/* Empty State */}
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/icons/empty-trades.svg"
                    alt="No trades"
                    width={96}
                    height={96}
                    className="opacity-60"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">You haven't traded yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Start trading now!</p>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                  Create an Offer
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
