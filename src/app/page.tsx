'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import dynamic from 'next/dynamic'
import QuickTradeForm from "@/components/quick-trade-form"
import CurrencyPairs from "@/components/currency-pairs"
import FeaturesSection from "@/components/features-section"
import WhyTradeWithUs from "@/components/why-trade-with-us"
import TradingInfo from "@/components/trading-info"
import SupportFeatures from "@/components/support-features"

const TradingPreview = dynamic(() => import('@/components/trading-preview'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="py-16 relative">
          {/* Live Exchange Rate Tickers */}
          <div className="mb-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { 
                  currency: "USD",
                  name: "US Dollar",
                  rate: "42,300",
                  change: "+0.8%",
                  trend: "up",
                  flag: "🇺🇸"
                },
                { 
                  currency: "EUR",
                  name: "Euro",
                  rate: "46,100",
                  change: "+0.5%",
                  trend: "up",
                  flag: "🇪🇺"
                },
                { 
                  currency: "GBP",
                  name: "British Pound",
                  rate: "53,700",
                  change: "-0.3%",
                  trend: "down",
                  flag: "🇬🇧"
                },
                { 
                  currency: "AED",
                  name: "UAE Dirham",
                  rate: "11,520",
                  change: "+0.2%",
                  trend: "up",
                  flag: "🇦🇪"
                },
                { 
                  currency: "TRY",
                  name: "Turkish Lira",
                  rate: "1,450",
                  change: "-0.7%",
                  trend: "down",
                  flag: "🇹🇷"
                },
                { 
                  currency: "CNY",
                  name: "Chinese Yuan",
                  rate: "5,920",
                  change: "+0.4%",
                  trend: "up",
                  flag: "🇨🇳"
                }
              ].map((currency) => (
                <div 
                  key={currency.currency}
                  className="bg-[#1C1F26] rounded-lg p-4 border border-gray-800 hover:border-[#c5f82a]/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currency.flag}</span>
                      <span className="font-medium text-white">{currency.currency}/IRR</span>
                    </div>
                    <div className={`text-sm ${
                      currency.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {currency.change}
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#c5f82a]">{currency.rate}</div>
                  <div className="text-sm text-gray-400">{currency.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Content and Market Overview */}
          <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-white">Exchange</span>
                <span className="block text-[#c5f82a]">Iranian Rial</span>
                <span className="text-white">Globally</span>
              </h1>
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Fast and secure P2P platform for exchanging Iranian Rial (IRR) with major world currencies. 
                Trade with verified users worldwide through our trusted escrow service.
              </p>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-[#c5f82a] text-black px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#b3e025] shadow-lg shadow-[#c5f82a]/20"
                  asChild
                >
                  <Link href="/trades">Start Trading</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#c5f82a] text-[#c5f82a] px-8 py-4 rounded-lg text-lg font-medium hover:bg-[#c5f82a]/10"
                  asChild
                >
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-[#1C1F26] rounded-2xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#c5f82a]">Popular</span> Exchange Routes
              </h3>
              <div className="space-y-4">
                {[
                  { from: "IRR", to: "USD", volume: "12.5M", users: "1.2K" },
                  { from: "IRR", to: "EUR", volume: "8.2M", users: "850" },
                  { from: "IRR", to: "AED", volume: "5.4M", users: "620" },
                  { from: "IRR", to: "TRY", volume: "3.8M", users: "480" },
                ].map((route) => (
                  <div 
                    key={`${route.from}-${route.to}`}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg hover:bg-black/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-medium">
                        {route.from} → {route.to}
                      </div>
                      <div className="text-sm text-gray-400">
                        {route.users} active users
                      </div>
                    </div>
                    <div className="text-[#c5f82a]">
                      ${route.volume}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trading Preview Section - Full Width */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-white">Live</span>
                <span className="text-[#c5f82a] ml-3">Trading</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                View real-time market activity and trade history
              </p>
            </div>
            <div className="bg-[#0a0a0a] rounded-2xl border border-[#c5f82a]/10">
              <TradingPreview />
            </div>
          </div>
        </div>

        {/* Why Trade With Us Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-white">Why Choose</span>
              <span className="text-[#c5f82a] ml-3">IranP2P</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Experience the future of international money exchange
            </p>
          </div>
          <WhyTradeWithUs />
        </div>

        <CurrencyPairs />
        
        <FeaturesSection />

        {/* Quick Trade Form Section */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
            <div className="bg-[#1C1F26] rounded-2xl p-8 border border-[#c5f82a]/10 hover:border-[#c5f82a]/30 transition-colors duration-300">
              <h2 className="text-3xl font-bold mb-8">
                Start Trading <span className="text-[#c5f82a]">Now</span>
              </h2>
              <QuickTradeForm />
            </div>

            <TradingInfo />
          </div>
        </div>
      </div>
    </main>
  )
}
