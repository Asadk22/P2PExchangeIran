"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  TrendingUp,
  Timer,
  Shield,
  Users,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Banknote,
  LineChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

// Mock exchange rates
const MOCK_RATES = {
  EUR: { buy: 52000, sell: 51800 },
  USD: { buy: 48000, sell: 47800 },
  GBP: { buy: 61000, sell: 60800 },
  AED: { buy: 13100, sell: 13000 },
  TRY: { buy: 1650, sell: 1630 },
}

interface BuyPageProps {
  currency: keyof typeof MOCK_RATES
}

export function BuyPage({ currency }: BuyPageProps) {
  const [amount, setAmount] = useState("1000")
  const [rateProgress, setRateProgress] = useState(0)
  const [marketTrend, setMarketTrend] = useState({ trend: "up" as const, percentage: "2.3" })
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")

  // Enhanced rate update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRateProgress((prev) => {
        if (prev >= 100) {
          // Simulate rate update
          const variation = (Math.random() - 0.5) * 100
          const newRate = MOCK_RATES[currency].buy + variation
          MOCK_RATES[currency].buy = Math.round(newRate)
          return 0
        }
        return prev + 10
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currency])

  // Calculate IRR amount based on selected currency and amount
  const calculateIRR = () => {
    const rate = MOCK_RATES[currency]?.buy || 0
    const numAmount = parseFloat(amount.replace(/,/g, "")) || 0
    return new Intl.NumberFormat("en-US").format(rate * numAmount)
  }

  return (
    <div className="min-h-screen bg-[#111]">
      {/* Market Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[#1A1A1A] border-b border-gray-800 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              {Object.entries(MOCK_RATES).map(([curr, rates]) => (
                <Link 
                  key={curr} 
                  href={`/buy/${curr.toLowerCase()}`}
                >
                  <motion.div 
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-[#252525] cursor-pointer ${
                      curr === currency ? "bg-[#252525]" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-gray-400">{curr}/IRR</span>
                    <span className="text-white font-medium">{rates.buy}</span>
                    <motion.span 
                      className={marketTrend.trend === "up" ? "text-green-500" : "text-red-500"}
                      animate={{ y: marketTrend.trend === "up" ? -2 : 2 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <TrendingUp className="h-4 w-4" />
                    </motion.span>
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-24 bg-transparent border-gray-700">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1H</SelectItem>
                  <SelectItem value="24h">24H</SelectItem>
                  <SelectItem value="7d">7D</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 text-gray-400">
                <Timer className="h-4 w-4" />
                <span>Update in:</span>
                <Progress value={rateProgress} className="w-20 h-2" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Exchange Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-[#1A1A1A] border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Buy {currency}</h2>
                <div className="flex items-center gap-2 text-gray-400">
                  <LineChart className="h-5 w-5" />
                  <span>Rate: {MOCK_RATES[currency].buy} IRR</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Amount in {currency}</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-[#252525] border-gray-700 text-white"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {currency}
                    </div>
                  </div>
                </div>

                {/* Conversion Result */}
                <div className="flex items-center gap-4">
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <div className="flex-1 p-4 bg-[#252525] rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">You Get</div>
                    <div className="text-xl font-semibold text-white">
                      {calculateIRR()} IRR
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Payment Method</label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="bg-[#252525] border-gray-700">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="card">Card Payment</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-[#c6f135] text-black hover:bg-[#b3dc2f]">
                  Find Offers
                </Button>
              </div>
            </Card>

            {/* Market Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-[#1A1A1A] border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#252525] rounded-lg">
                    <Users className="h-5 w-5 text-[#c6f135]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Active Traders</div>
                    <div className="text-lg font-semibold text-white">2,547</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-[#1A1A1A] border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#252525] rounded-lg">
                    <ArrowUpDown className="h-5 w-5 text-[#c6f135]" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">24h Volume</div>
                    <div className="text-lg font-semibold text-white">€125.3K</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Why Choose Us */}
            <Card className="p-6 bg-[#1A1A1A] border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Why Choose Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#c6f135] mt-1" />
                  <div>
                    <div className="font-medium text-white">Secure Transactions</div>
                    <div className="text-sm text-gray-400">Your funds are protected by our escrow service</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#c6f135] mt-1" />
                  <div>
                    <div className="font-medium text-white">Verified Traders</div>
                    <div className="text-sm text-gray-400">All traders are verified and trusted</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-[#c6f135] mt-1" />
                  <div>
                    <div className="font-medium text-white">24/7 Support</div>
                    <div className="text-sm text-gray-400">Our support team is always here to help</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Banknote className="h-5 w-5 text-[#c6f135] mt-1" />
                  <div>
                    <div className="font-medium text-white">Best Rates</div>
                    <div className="text-sm text-gray-400">Competitive rates updated in real-time</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-[#1A1A1A] border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Lowest Ask</span>
                  <span className="text-white font-medium">{MOCK_RATES[currency].sell} IRR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Highest Bid</span>
                  <span className="text-white font-medium">{MOCK_RATES[currency].buy} IRR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">24h Change</span>
                  <span className="text-green-500">+{marketTrend.percentage}%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
